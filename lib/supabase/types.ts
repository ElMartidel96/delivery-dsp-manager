/**
 * Database Types for Supabase
 *
 * Estos tipos se pueden generar automáticamente con:
 * npx supabase gen types typescript --project-id bkzkcfajhxysiotfznij > lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Estados de entrega
export type DeliveryStatus =
  | 'pending'
  | 'assigned'
  | 'picked_up'
  | 'in_transit'
  | 'arrived'
  | 'delivered'
  | 'failed'
  | 'returned';

// Estados de driver
export type DriverStatus =
  | 'pending_verification'
  | 'active'
  | 'inactive'
  | 'suspended';

// Estados de pago
export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed';

// Tamaños de paquete
export type PackageSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'extra_large';

// Roles de usuario
export type UserRole =
  | 'admin'
  | 'dispatcher'
  | 'driver'
  | 'customer';

export interface Database {
  public: {
    Tables: {
      // Perfiles de usuario
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Conductores
      drivers: {
        Row: {
          id: string;
          user_id: string;
          license_number: string | null;
          license_expiry: string | null;
          license_photo_url: string | null;
          status: DriverStatus;
          w9_submitted: boolean;
          w9_submitted_at: string | null;
          background_check_passed: boolean | null;
          onboarding_completed_at: string | null;
          rating: number;
          total_deliveries: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          license_number?: string | null;
          license_expiry?: string | null;
          license_photo_url?: string | null;
          status?: DriverStatus;
          w9_submitted?: boolean;
          w9_submitted_at?: string | null;
          background_check_passed?: boolean | null;
          onboarding_completed_at?: string | null;
          rating?: number;
          total_deliveries?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          license_number?: string | null;
          license_expiry?: string | null;
          license_photo_url?: string | null;
          status?: DriverStatus;
          w9_submitted?: boolean;
          w9_submitted_at?: string | null;
          background_check_passed?: boolean | null;
          onboarding_completed_at?: string | null;
          rating?: number;
          total_deliveries?: number;
          created_at?: string;
        };
      };
      // Entregas
      deliveries: {
        Row: {
          id: string;
          tracking_number: string;
          uniuni_order_id: string | null;
          driver_id: string | null;
          status: DeliveryStatus;
          pickup_address: Json;
          delivery_address: Json;
          recipient_name: string | null;
          recipient_phone: string | null;
          package_size: PackageSize | null;
          special_instructions: string | null;
          scheduled_date: string | null;
          time_window_start: string | null;
          time_window_end: string | null;
          assigned_at: string | null;
          picked_up_at: string | null;
          delivered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tracking_number: string;
          uniuni_order_id?: string | null;
          driver_id?: string | null;
          status?: DeliveryStatus;
          pickup_address: Json;
          delivery_address: Json;
          recipient_name?: string | null;
          recipient_phone?: string | null;
          package_size?: PackageSize | null;
          special_instructions?: string | null;
          scheduled_date?: string | null;
          time_window_start?: string | null;
          time_window_end?: string | null;
          assigned_at?: string | null;
          picked_up_at?: string | null;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tracking_number?: string;
          uniuni_order_id?: string | null;
          driver_id?: string | null;
          status?: DeliveryStatus;
          pickup_address?: Json;
          delivery_address?: Json;
          recipient_name?: string | null;
          recipient_phone?: string | null;
          package_size?: PackageSize | null;
          special_instructions?: string | null;
          scheduled_date?: string | null;
          time_window_start?: string | null;
          time_window_end?: string | null;
          assigned_at?: string | null;
          picked_up_at?: string | null;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Proof of Delivery
      delivery_pods: {
        Row: {
          id: string;
          delivery_id: string;
          photo_url: string | null;
          signature_url: string | null;
          gps_latitude: number | null;
          gps_longitude: number | null;
          notes: string | null;
          captured_at: string;
          verified_by: string | null;
          verified_at: string | null;
        };
        Insert: {
          id?: string;
          delivery_id: string;
          photo_url?: string | null;
          signature_url?: string | null;
          gps_latitude?: number | null;
          gps_longitude?: number | null;
          notes?: string | null;
          captured_at?: string;
          verified_by?: string | null;
          verified_at?: string | null;
        };
        Update: {
          id?: string;
          delivery_id?: string;
          photo_url?: string | null;
          signature_url?: string | null;
          gps_latitude?: number | null;
          gps_longitude?: number | null;
          notes?: string | null;
          captured_at?: string;
          verified_by?: string | null;
          verified_at?: string | null;
        };
      };
      // Vehículos
      vehicles: {
        Row: {
          id: string;
          driver_id: string | null;
          plate_number: string;
          make: string | null;
          model: string | null;
          year: number | null;
          color: string | null;
          capacity_cubic_ft: number | null;
          insurance_policy: string | null;
          insurance_expiry: string | null;
          registration_expiry: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          driver_id?: string | null;
          plate_number: string;
          make?: string | null;
          model?: string | null;
          year?: number | null;
          color?: string | null;
          capacity_cubic_ft?: number | null;
          insurance_policy?: string | null;
          insurance_expiry?: string | null;
          registration_expiry?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          driver_id?: string | null;
          plate_number?: string;
          make?: string | null;
          model?: string | null;
          year?: number | null;
          color?: string | null;
          capacity_cubic_ft?: number | null;
          insurance_policy?: string | null;
          insurance_expiry?: string | null;
          registration_expiry?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
      // Pagos a drivers
      driver_payments: {
        Row: {
          id: string;
          driver_id: string;
          period_start: string;
          period_end: string;
          total_deliveries: number | null;
          base_pay: number | null;
          bonuses: number;
          deductions: number;
          net_pay: number | null;
          status: PaymentStatus;
          paid_at: string | null;
          payment_method: string | null;
          transaction_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          driver_id: string;
          period_start: string;
          period_end: string;
          total_deliveries?: number | null;
          base_pay?: number | null;
          bonuses?: number;
          deductions?: number;
          net_pay?: number | null;
          status?: PaymentStatus;
          paid_at?: string | null;
          payment_method?: string | null;
          transaction_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          driver_id?: string;
          period_start?: string;
          period_end?: string;
          total_deliveries?: number | null;
          base_pay?: number | null;
          bonuses?: number;
          deductions?: number;
          net_pay?: number | null;
          status?: PaymentStatus;
          paid_at?: string | null;
          payment_method?: string | null;
          transaction_id?: string | null;
          created_at?: string;
        };
      };
      // Ubicaciones de drivers en tiempo real
      driver_locations: {
        Row: {
          id: string;
          driver_id: string;
          latitude: number;
          longitude: number;
          accuracy_meters: number | null;
          speed_kmh: number | null;
          heading: number | null;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          driver_id: string;
          latitude: number;
          longitude: number;
          accuracy_meters?: number | null;
          speed_kmh?: number | null;
          heading?: number | null;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          driver_id?: string;
          latitude?: number;
          longitude?: number;
          accuracy_meters?: number | null;
          speed_kmh?: number | null;
          heading?: number | null;
          recorded_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      delivery_status: DeliveryStatus;
      driver_status: DriverStatus;
      payment_status: PaymentStatus;
      package_size: PackageSize;
      user_role: UserRole;
    };
  };
}
