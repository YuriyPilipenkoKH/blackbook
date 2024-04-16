
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main>
      blackbook
      <UserButton 
            afterSignOutUrl="/sign-in"/>

    </main>
  );
}
