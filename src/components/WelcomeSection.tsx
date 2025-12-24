interface WelcomeSectionProps {
  userName: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  const firstName =
    userName.split(" ")[0] && userName.split(" ")[0].length > 0
      ? userName.split(" ")[0]
      : userName;

  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50">
        Welcome back, <span className="text-emerald-600">{firstName}</span>
      </h1>
      <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
        Use <span className="font-medium">AgroScope</span> to detect crop
        diseases early, track weather risks, and protect your yields with
        data‑driven decisions.
      </p>
    </section>
  );
};
