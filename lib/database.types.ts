export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          course: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          ticket_id: string
        }
        Insert: {
          course?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          ticket_id: string
        }
        Update: {
          course?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          ticket_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          badge: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          is_active: boolean | null
          rating: number | null
          slug: string
          sort_order: number | null
          students: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          badge?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_active?: boolean | null
          rating?: number | null
          slug: string
          sort_order?: number | null
          students?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          badge?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_active?: boolean | null
          rating?: number | null
          slug?: string
          sort_order?: number | null
          students?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt: string
          category: string
          created_at: string | null
          id: string
          image_url: string
          is_active: boolean | null
          sort_order: number | null
          title: string
        }
        Insert: {
          alt: string
          category?: string
          created_at?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          sort_order?: number | null
          title: string
        }
        Update: {
          alt?: string
          category?: string
          created_at?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          address: string | null
          batch_type: string | null
          board: string | null
          city: string | null
          course: string
          created_at: string | null
          date_of_birth: string
          email: string
          first_name: string
          gender: string | null
          highest_qualification: string | null
          hostel_required: boolean | null
          id: string
          last_name: string
          passing_year: string | null
          percentage: string | null
          phone: string
          pincode: string | null
          preferred_batch: string | null
          registration_id: string
          school_name: string | null
          state: string | null
          status: string
        }
        Insert: {
          address?: string | null
          batch_type?: string | null
          board?: string | null
          city?: string | null
          course: string
          created_at?: string | null
          date_of_birth: string
          email: string
          first_name: string
          gender?: string | null
          highest_qualification?: string | null
          hostel_required?: boolean | null
          id?: string
          last_name: string
          passing_year?: string | null
          percentage?: string | null
          phone: string
          pincode?: string | null
          preferred_batch?: string | null
          registration_id: string
          school_name?: string | null
          state?: string | null
          status?: string
        }
        Update: {
          address?: string | null
          batch_type?: string | null
          board?: string | null
          city?: string | null
          course?: string
          created_at?: string | null
          date_of_birth?: string
          email?: string
          first_name?: string
          gender?: string | null
          highest_qualification?: string | null
          hostel_required?: boolean | null
          id?: string
          last_name?: string
          passing_year?: string | null
          percentage?: string | null
          phone?: string
          pincode?: string | null
          preferred_batch?: string | null
          registration_id?: string
          school_name?: string | null
          state?: string | null
          status?: string
        }
        Relationships: []
      }
      results: {
        Row: {
          batch_year: string | null
          branch: string | null
          created_at: string | null
          exam: string
          id: string
          image_url: string | null
          is_featured: boolean | null
          rank: string | null
          sort_order: number | null
          student_name: string
        }
        Insert: {
          batch_year?: string | null
          branch?: string | null
          created_at?: string | null
          exam: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          rank?: string | null
          sort_order?: number | null
          student_name: string
        }
        Update: {
          batch_year?: string | null
          branch?: string | null
          created_at?: string | null
          exam?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          rank?: string | null
          sort_order?: number | null
          student_name?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          sort_order: number | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          question: string
          answer: string
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      mentors: {
        Row: {
          id: string
          name: string
          designation: string | null
          expertise: string | null
          experience: string | null
          branch: string | null
          initials: string | null
          image_url: string | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          designation?: string | null
          expertise?: string | null
          experience?: string | null
          branch?: string | null
          initials?: string | null
          image_url?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          designation?: string | null
          expertise?: string | null
          experience?: string | null
          branch?: string | null
          initials?: string | null
          image_url?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          name: string
          achievement: string | null
          course: string | null
          content: string
          rating: number | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          achievement?: string | null
          course?: string | null
          content: string
          rating?: number | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          achievement?: string | null
          course?: string | null
          content?: string
          rating?: number | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          announcement: Json
          contact: Json
          hero: Json
          id: number
          sections: Json
          stats: Json
          updated_at: string | null
        }
        Insert: {
          announcement?: Json
          contact?: Json
          hero?: Json
          id?: number
          sections?: Json
          stats?: Json
          updated_at?: string | null
        }
        Update: {
          announcement?: Json
          contact?: Json
          hero?: Json
          id?: number
          sections?: Json
          stats?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
