## lsd

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

Next, create a Supabase project, and then in the SQL Editor of the dashboard, click `New Query`, and run the following scripts:

Tables

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  balance INT8 DEFAULT 0,
  ln_address TEXT,
  email TEXT,
  username TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE charges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  settled BOOLEAN DEFAULT FALSE,
  amount INT4,
  user_id UUID NOT NULL REFERENCES profiles(id),
  expired BOOLEAN DEFAULT FALSE
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  debit_id UUID,
  debit int8 DEFAULT 0,
  credit int8 DEFAULT 0,
  participant_id UUID NOT NULL REFERENCES profiles(id)
);

CREATE TABLE settlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type TEXT,
  debit INT8 DEFAULT 0,
  credit INT8 DEFAULT 0,
  user_id UUID NOT NULL REFERENCES profiles(id)
);

CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  amount INT8,
  ln_address TEXT,
  user_id UUID NOT NULL REFERENCES profiles(id),
  settled BOOLEAN DEFAULT FALSE
);

```

Database Functions

```sql
-- Create Profile after Authenticated - - - - - - - - - - - - - - - - - - - - - -
CREATE FUNCTION create_profile()
RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


-- Calculate the balance after a payment is made - - - - - - - - - - - - - - - -
CREATE FUNCTION balance_after_payment() RETURNS TRIGGER SECURITY DEFINER AS $$
DECLARE
  -- Debitor variables
  debitor_settlements_balance INTEGER;
  debitor_payments_balance INTEGER;
  debitor_total_balance INTEGER;

  -- Creditor variables
  creditor_settlements_balance INTEGER;
  creditor_payments_balance INTEGER;
  creditor_total_balance INTEGER;
BEGIN
  -- DEBITOR

  -- Get the balance of the debitor from the settlements table
  debitor_settlements_balance = (SELECT COALESCE(SUM(credit) - SUM(debit), 0)
                                 FROM public.settlements
                                 WHERE user_id = NEW.user_id);

  -- Get the balance of the debitor from the payments table
  debitor_payments_balance = (SELECT COALESCE(SUM(credit) - SUM(debit), 0)
                              FROM public.payments
                              WHERE user_id = NEW.user_id);

  -- Calculate total balance of the debitor
  debitor_total_balance = (debitor_settlements_balance + debitor_payments_balance);

  -- Update the debitor's profile balance
  UPDATE public.profiles
  SET balance = debitor_total_balance
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

-- Calculate the balance after a settlement is made - - - - - - - - - - - - - - -
CREATE FUNCTION balance_after_settlement() RETURNS TRIGGER SECURITY DEFINER AS $$
DECLARE
  settlements_balance INTEGER;
  payments_balance INTEGER;
  total_balance INTEGER;
BEGIN
  -- Get the balance from the settlements table
  settlements_balance = (SELECT COALESCE(SUM(credit) - SUM(debit), 0)
                          FROM public.settlements
                          WHERE user_id = NEW.user_id);

  -- Get the balance of the user from the payments table
  payments_balance = (SELECT COALESCE(SUM(credit) - SUM(debit), 0)
                      FROM public.payments
                      WHERE user_id = NEW.user_id);

  -- Get the total balance across settlements and payments balance
  total_balance = (settlements_balance + payments_balance);

  -- Update the profile table to reflect the balance
  UPDATE public.profiles
  SET balance = total_balance
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


-- Creates a credit entry for every debit entry - - - - - - - - - - - - - -
CREATE FUNCTION create_credit_on_debit_payment() RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
  IF NEW.debit > 0 THEN
    INSERT INTO public.payments(participant_id, credit, debit_id, user_id)
    VALUES (NEW.user_id, NEW.debit, NEW.id, NEW.participant_id);

    RETURN NEW;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


-- Create a TX row when a charge is settled - - - - - - - - - - - - - - -
CREATE FUNCTION create_tx_on_charge() RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
  IF NEW.settled = TRUE THEN
    INSERT INTO public.settlements(id, credit, user_id, type)
    VALUES (NEW.id, NEW.amount, NEW.user_id, 'FUND');

    RETURN NEW;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - -

-- Create a TX on a withdrawal - - - - - - - - - - - - - - - - - - - - - - - - --
CREATE FUNCTION create_tx_on_withdrawal() RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
  IF NEW.settled = TRUE THEN
    INSERT INTO public.settlements(id, debit, user_id, type)
    VALUES (NEW.id, NEW.amount, NEW.user_id, 'WITHDRAWAL');

    RETURN NEW;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - - -

```

Triggers

```sql
-- Trigger for Creating Profile after Authenticated - - - -
CREATE TRIGGER create_profile
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_profile();
-- - - - - - - - - - - - - - -  - - - - - - - - - - - - - -

-- Trigger for calculating balance after a payment - - - - -
CREATE TRIGGER balance_after_payment
  AFTER INSERT ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION balance_after_payment();
-- - - - - - - - -  - - - - - - - - - - - - - - - - - - -

-- Trigger for calculating balance after a settlement - - - -
CREATE TRIGGER balance_after_settlement
  AFTER INSERT ON public.settlements
  FOR EACH ROW
  EXECUTE FUNCTION balance_after_settlement();
--  - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

-- Trigger for creating a credit entry for every debit - - -
CREATE TRIGGER create_credit_on_debit_payment
  AFTER INSERT ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION create_credit_on_debit_payment();
-- - - - - - - - - - - - - - - - - - - - - - - - - -- -  - - -

-- Trigger for creating tx on a settled charge - - - - - - -
CREATE TRIGGER create_tx_on_charge
  AFTER UPDATE ON public.charges
  FOR EACH ROW
  EXECUTE FUNCTION create_tx_on_charge();
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

-- Trigger for creating a TX on a withdrawal - - - - - - - - - - - - - - - - - - - -
CREATE TRIGGER create_tx_on_withdrawal
  AFTER UPDATE ON public.withdrawals
  FOR EACH ROW
  EXECUTE FUNCTION create_tx_on_withdrawal();
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

Database Settings

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE charges,profiles
```

This will instruct the Supabase DB to create a `profiles` table, and when a user is authenticated, to automatically create a row in the profiles table

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```
