const navItems = [
  { href: "#work", icon: "work", label: "Work", active: true },
  { href: "#experience", icon: "history", label: "Exp", active: false },
  { href: "#about", icon: "person", label: "Profile", active: false },
  { href: "#contact", icon: "mail", label: "Mail", active: false },
];

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container/90 backdrop-blur-md z-100 border-t border-outline-variant/10 px-6 py-4 flex justify-around items-center">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center gap-1 ${
            item.active ? "text-primary" : "text-outline"
          }`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="text-[10px] font-label uppercase">{item.label}</span>
        </a>
      ))}
    </div>
  );
}
