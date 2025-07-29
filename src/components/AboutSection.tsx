import { 
  UserGroupIcon, 
  BriefcaseIcon, 
  ChartBarIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  CogIcon
} from '@heroicons/react/24/outline'

const AboutSection = () => {
  const features = [
    {
      icon: UserGroupIcon,
      title: "Client Management",
      description: "Organize and manage all your client information in one centralized location with easy search and filtering capabilities."
    },
    {
      icon: BriefcaseIcon,
      title: "Project Tracking",
      description: "Keep track of project progress, deadlines, budgets, and milestones with intuitive dashboards and reporting tools."
    },
    {
      icon: ChartBarIcon,
      title: "Analytics & Reports",
      description: "Get detailed insights into your business performance with comprehensive analytics and customizable reports."
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure & Reliable",
      description: "Built with security best practices including authentication, data validation, and protection against common vulnerabilities."
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Mobile Responsive",
      description: "Access your data anywhere with a fully responsive design that works perfectly on desktop, tablet, and mobile devices."
    },
    {
      icon: CogIcon,
      title: "Easy Integration",
      description: "RESTful API design makes it easy to integrate with existing tools and workflows in your business ecosystem."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Workcity Assessment?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive solution designed for modern businesses that need efficient 
            client and project management with enterprise-level features.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Projects Managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
