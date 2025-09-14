-- Enable Row Level Security on all public tables that are missing it
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Create policies for courses table
-- Allow public read access for course browsing
CREATE POLICY "courses_select_public" 
ON public.courses 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert courses (for instructors/admins)
CREATE POLICY "courses_insert_authenticated" 
ON public.courses 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update their own courses
-- For now, allow any authenticated user - can be refined later with role checks
CREATE POLICY "courses_update_authenticated" 
ON public.courses 
FOR UPDATE 
TO authenticated
USING (true);

-- Create policies for fields table
-- Allow public read access for field browsing
CREATE POLICY "fields_select_public" 
ON public.fields 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert fields (for admins)
CREATE POLICY "fields_insert_authenticated" 
ON public.fields 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update fields
CREATE POLICY "fields_update_authenticated" 
ON public.fields 
FOR UPDATE 
TO authenticated
USING (true);

-- Create policies for lessons table
-- Allow public read access for lesson browsing
CREATE POLICY "lessons_select_public" 
ON public.lessons 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert lessons (for instructors/admins)
CREATE POLICY "lessons_insert_authenticated" 
ON public.lessons 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update lessons
CREATE POLICY "lessons_update_authenticated" 
ON public.lessons 
FOR UPDATE 
TO authenticated
USING (true);