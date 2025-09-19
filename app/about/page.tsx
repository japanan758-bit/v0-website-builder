"use client"

import { Users, Target, Award, Heart, Sparkles, Globe, Code, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: "الابتكار",
      description: "نسعى دائماً لتطوير حلول مبتكرة تجعل إنشاء المواقع أسهل وأكثر متعة",
    },
    {
      icon: Users,
      title: "التركيز على العميل",
      description: "عملاؤنا في المقدمة، ونعمل باستمرار على تحسين تجربتهم",
    },
    {
      icon: Award,
      title: "الجودة",
      description: "نلتزم بأعلى معايير الجودة في كل ما نقدمه من منتجات وخدمات",
    },
    {
      icon: Heart,
      title: "الشغف",
      description: "نحب ما نفعله ونؤمن بقوة التكنولوجيا في تغيير العالم",
    },
  ]

  const team = [
    {
      name: "أحمد محمد",
      role: "المؤسس والرئيس التنفيذي",
      image: "/placeholder.svg?height=200&width=200",
      description: "خبير في تطوير المنتجات التقنية مع أكثر من 10 سنوات من الخبرة",
    },
    {
      name: "فاطمة أحمد",
      role: "مديرة التطوير",
      image: "/placeholder.svg?height=200&width=200",
      description: "متخصصة في الذكاء الاصطناعي وتطوير الواجهات الأمامية",
    },
    {
      name: "محمد علي",
      role: "مدير التصميم",
      image: "/placeholder.svg?height=200&width=200",
      description: "مصمم UX/UI مبدع مع شغف لإنشاء تجارب مستخدم استثنائية",
    },
    {
      name: "سارة خالد",
      role: "مديرة التسويق",
      image: "/placeholder.svg?height=200&width=200",
      description: "خبيرة في التسويق الرقمي واستراتيجيات النمو",
    },
  ]

  const stats = [
    { icon: Globe, value: "50,000+", label: "موقع تم إنشاؤه" },
    { icon: Users, value: "25,000+", label: "عميل راضٍ" },
    { icon: Code, value: "100+", label: "قالب احترافي" },
    { icon: Zap, value: "99.9%", label: "وقت التشغيل" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">من نحن</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              نحن فريق من المطورين والمصممين المتحمسين الذين يؤمنون بقوة التكنولوجيا في تبسيط إنشاء المواقع الإلكترونية.
              مهمتنا هي جعل بناء المواقع الاحترافية في متناول الجميع، بغض النظر عن خبرتهم التقنية.
            </p>
            <Button size="lg" className="btn-glow">
              <Heart className="w-5 h-5 ml-2" />
              انضم إلى رحلتنا
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="hover-lift">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  أن نكون المنصة الرائدة عالمياً في مجال إنشاء المواقع بالذكاء الاصطناعي، ونمكن كل شخص من تحويل أفكاره
                  إلى مواقع إلكترونية احترافية بسهولة ويسر.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">مهمتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  تطوير أدوات ذكية ومبتكرة تجعل إنشاء المواقع الإلكترونية عملية ممتعة وسهلة، مع التركيز على الجودة
                  والأداء وتجربة المستخدم الاستثنائية.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">قيمنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">القيم التي توجه عملنا وتشكل ثقافة شركتنا</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center hover-lift">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">إنجازاتنا بالأرقام</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">أرقام تعكس ثقة عملائنا ونجاح منصتنا</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 text-white mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">فريقنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">تعرف على الأشخاص المبدعين وراء WebCraft AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardHeader>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
