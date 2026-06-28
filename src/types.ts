/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  occupation: string;
  goal: string;
  utmSource: string;
  utmMedium: string;
  device: string;
  sourceUrl: string;
  paymentStatus: string;
  createdAt: any; // Firestore Timestamp or string
}

export interface Enrollment {
  id?: string;
  name: string;
  phone: string;
  email: string;
  courseId: string;
  amountPaid: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: any;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl: string;
  stat?: string;
  type?: string;
  createdAt: any;
}

export interface Blog {
  id?: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: any;
}

export type SEOPagePath =
  | '/'
  | '/online-ai-digital-marketing-course-in-tamil'
  | '/ai-digital-marketing-course-in-chennai'
  | '/chatgpt-marketing-course'
  | '/ai-seo-course'
  | '/geo-course'
  | '/aeo-course'
  | '/n8n-course'
  | '/micro-saas-course'
  | '/google-ads-course'
  | '/meta-ads-course'
  | '/freelancing-course'
  | '/business-course';

export interface SEOPageData {
  path: SEOPagePath;
  title: string;
  headline: string;
  subheadline: string;
  keywords: string[];
  description: string;
  focusArea: string;
}
