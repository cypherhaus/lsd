## create-dash-app

This is a starter project for building web apps, built with [Next.js](https://nextjs.org/) and [Supabase](https://supabase.co).

It includes:

- Authentication
- A Sidebar navigation
- Toasts
- State management
- Database

## Getting Started

First, create an account at Supabase and enter the environment variables in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Next, create a Supabase project, and then in the SQL Editor of the dashboard, click `New Query`, and run the following script.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  username TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE FUNCTION create_profile_on_user_insert()
RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_profile_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_profile_on_user_insert();

```

This will instruct the Supabase DB to create a `profiles` table, and when a user is authenticated, to automatically create a row in the profiles table

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```
