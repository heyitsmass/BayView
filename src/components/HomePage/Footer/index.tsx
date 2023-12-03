import Link from "next/link";

export function Footer() {
  const basePath = "/home/policies";

  type Policy = {
    label: string;
    href: string;
  };

  const policies: Policy[] = [
    {
      label: "Terms of Use",
      href: `${basePath}/terms`,
    },
    {
      label: "Privacy Policy",
      href: `${basePath}/privacy`,
    },
    {
      label: "Disclaimer",
      href: `${basePath}/data`,
    },
    {
      label: "Cookies",
      href: `${basePath}/cookies`,
    },
    {
      label: "Data Requests",
      href: `${basePath}/data/request`,
    },
  ];

  return (
    <div className="flex text-xs items-center justify-center gap-4 footer w-full border border-x-0 bg-white border-zinc-200 dark:border-zinc-700 dark:text-white z-50 dark:bg-zinc-800 absolute bottom-0 h-10">
      {policies.map((policy, i) => (
        <Link key={i} href={policy.href}>
          {policy.label}
        </Link>
      ))}
    </div>
  );
}
