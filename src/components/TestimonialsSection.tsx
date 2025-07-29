import { StarIcon } from '@heroicons/react/24/solid'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "TechCorp Solutions",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "Workcity Assessment has transformed how we manage our client relationships. The intuitive interface and powerful features have increased our productivity by 40%."
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "Digital Innovations",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "The project tracking capabilities are outstanding. We can now deliver projects on time and within budget consistently. Highly recommended!"
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director",
      company: "Creative Agency",
      image: "/api/placeholder/64/64",
      rating: 5,
      text: "Amazing tool for managing multiple clients and projects. The reporting features give us insights we never had before. Game changer for our business!"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what professionals are saying 
            about Workcity Assessment.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-600 mb-6 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Join thousands of satisfied users who trust Workcity Assessment
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600 font-medium">4.9/5 from 200+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
