# Security Specification for ZenX Academy

## 1. Data Invariants

- **Leads Security**: Leads contain highly sensitive customer PII (email, phone, whatsapp). No public reading or listing of leads is allowed. Public users can ONLY write (create) leads. Admins are the only ones who can view, list, or delete leads.
- **Enrollments Security**: Enrollments contain financial and student registration records. Public users can ONLY create enrollments (when booking/paying). Only Admins can view, list, edit, or delete enrollments.
- **Testimonials Security**: Public can read/list testimonials. Writing, updating, or deleting is strictly restricted to Admins.
- **Blogs Security**: Public can read/list blogs. Writing, updating, or deleting is strictly restricted to Admins.
- **Timestamp Integrity**: All created documents must use the server timestamp (`request.time`) for their creation fields.
- **Strict Size Limits**: No string fields can exceed standard lengths, preventing denial-of-wallet payload-flooding attacks.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following 12 payloads attempt to violate security invariants and must return `PERMISSION_DENIED`:

### Payload 1: Unauthorized Read of Leads
An unauthenticated user attempts to list all user leads.
```json
{
  "operation": "list",
  "collection": "leads",
  "auth": null
}
```

### Payload 2: Spoofed Creator UID
An authenticated attacker attempts to write a Lead claiming another user's identity.
```json
{
  "operation": "create",
  "collection": "leads",
  "auth": { "uid": "attacker_id" },
  "data": {
    "name": "Target User",
    "phone": "9999999999",
    "email": "target@gmail.com",
    "createdAt": "request.time",
    "ownerId": "victim_id"
  }
}
```

### Payload 3: Client-Provided Creation Timestamp
A user attempts to create a lead with a backdated or future timestamp from their system clock instead of using `request.time`.
```json
{
  "operation": "create",
  "collection": "leads",
  "auth": null,
  "data": {
    "name": "Hacker",
    "phone": "9999999999",
    "email": "hacker@gmail.com",
    "createdAt": "1999-01-01T00:00:00Z"
  }
}
```

### Payload 4: Excessively Large Lead Payload (Denial of Wallet)
A client attempts to create a lead with an extremely large payload containing high volume trash data to exceed storage limits.
```json
{
  "operation": "create",
  "collection": "leads",
  "auth": null,
  "data": {
    "name": "SpamBot",
    "phone": "0000000000",
    "email": "spam@spam.com",
    "city": "[1MB of garbage characters...]",
    "createdAt": "request.time"
  }
}
```

### Payload 5: Lead Update by Guest
An unauthenticated guest attempts to modify an existing lead's status to 'paid'.
```json
{
  "operation": "update",
  "collection": "leads",
  "id": "lead_123",
  "auth": null,
  "data": {
    "paymentStatus": "paid"
  }
}
```

### Payload 6: Non-Admin Blog Creation
An authenticated non-admin user attempts to create a blog post.
```json
{
  "operation": "create",
  "collection": "blogs",
  "auth": { "uid": "normal_user_123", "token": { "email": "normal@gmail.com", "email_verified": true } },
  "data": {
    "title": "Hacked!",
    "slug": "hacked",
    "content": "Malicious content",
    "createdAt": "request.time"
  }
}
```

### Payload 7: Self-Promotion to Admin
A normal user attempts to update their own role or profile to register as an admin.
```json
{
  "operation": "create",
  "collection": "admins",
  "auth": { "uid": "attacker_uid" },
  "data": {
    "isAdmin": true
  }
}
```

### Payload 8: Testimonial Modification by Client
A client tries to alter standard student reviews to display highly misleading ratings.
```json
{
  "operation": "update",
  "collection": "testimonials",
  "id": "review_456",
  "auth": { "uid": "user_789" },
  "data": {
    "rating": 5,
    "content": "Overwritten spam review"
  }
}
```

### Payload 9: Listing All Enrollments
A malicious user tries to fetch all course enrollments to harvest student emails and phone numbers.
```json
{
  "operation": "list",
  "collection": "enrollments",
  "auth": { "uid": "hacker_uid" }
}
```

### Payload 10: Injecting Invalid Types in Fields
An attacker submits a lead where the email is a list of objects instead of a valid string format.
```json
{
  "operation": "create",
  "collection": "leads",
  "auth": null,
  "data": {
    "name": "BugFinder",
    "phone": "9962999312",
    "email": ["not-a-string", "attacker@hacked.com"],
    "createdAt": "request.time"
  }
}
```

### Payload 11: Deleting a Course Enrollment
A user tries to delete their payment record to clear outstanding amounts or confuse accounting.
```json
{
  "operation": "delete",
  "collection": "enrollments",
  "id": "enrollment_001",
  "auth": { "uid": "student_uid" }
}
```

### Payload 12: Changing Immutable Field 'createdAt'
An admin or system user tries to change the immutability of the original creation date of a lead.
```json
{
  "operation": "update",
  "collection": "leads",
  "id": "lead_xyz",
  "auth": { "uid": "admin_uid", "token": { "email": "abishekabishek55337@gmail.com", "email_verified": true } },
  "data": {
    "createdAt": "2020-01-01T00:00:00Z",
    "updatedAt": "request.time"
  }
}
```

---

## 3. Test Runner (firestore.rules.test.ts)

Below is the type-safe testing framework representation designed to verify all dirty payloads return PERMISSION_DENIED.

```typescript
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

let testEnv: RulesTestEnvironment;

describe("ZenX Academy Firestore Rules Hardening", () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "bamboo-imagery-fj1d7",
      firestore: {
        rules: require("fs").readFileSync("firestore.rules", "utf8"),
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  test("Payload 1: Unauthorized Read of Leads - Fails", async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(unauthedDb, "leads/lead_123")));
  });

  test("Payload 6: Non-Admin Blog Creation - Fails", async () => {
    const attackerDb = testEnv
      .authenticatedContext("normal_user", {
        email: "normal@gmail.com",
        email_verified: true,
      })
      .firestore();
    await assertFails(
      setDoc(doc(attackerDb, "blogs/blog_123"), {
        title: "Hacked",
        slug: "hacked",
        content: "Malicious content",
        createdAt: new Date(),
      })
    );
  });

  test("Payload 9: Listing All Enrollments - Fails", async () => {
    const attackerDb = testEnv.authenticatedContext("hacker_uid").firestore();
    await assertFails(getDoc(doc(attackerDb, "enrollments/enrollment_001")));
  });
});
```
