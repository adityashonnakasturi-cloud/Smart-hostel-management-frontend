export default function Features() {
  const features = [
    {
      icon: "📋",
      title: "Complete Management",
      description: "Manage students, wardens, rooms, and complaints all in one place",
    },
    {
      icon: "🍽️",
      title: "Food Surplus Distribution",
      description: "Track and distribute surplus food to NGOs and communities",
    },
    {
      icon: "📊",
      title: "Analytics & Reports",
      description: "Get insights into occupancy, complaints, and distributions",
    },
    {
      icon: "👥",
      title: "Multi-Role Support",
      description: "Tailored dashboards for students, wardens, staff, and NGOs",
    },
  ]

  return (
    <section id="features" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed for modern hostel management and community service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
