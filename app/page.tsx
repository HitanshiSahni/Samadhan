import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { MapPin, Users, BarChart3, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Report Issues, <span className="text-[#FAC638]">Track Progress</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Connect citizens, contractors, and administrators in one platform to efficiently resolve community
            complaints and improve local services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="rounded-2xl bg-[#FAC638] text-black hover:bg-[#e5b82f]">
              <Link href="/contractor">View Contractor Dashboard</Link>
            </Button>
            <Button asChild size="lg" className="rounded-2xl bg-[#FAC638] text-black hover:bg-[#e5b82f]">
              <Link href="/admin">View Admin Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-[#FAC638]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[#FAC638]" />
                </div>
                <CardTitle className="text-lg">Report Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Citizens can easily report complaints with location mapping and photo uploads
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-[#FAC638]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#FAC638]" />
                </div>
                <CardTitle className="text-lg">Assign Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Administrators efficiently assign complaints to qualified contractors
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-[#FAC638]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-[#FAC638]" />
                </div>
                <CardTitle className="text-lg">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Real-time status updates keep everyone informed throughout the resolution process
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-[#FAC638]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-[#FAC638]" />
                </div>
                <CardTitle className="text-lg">Analyze Data</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Comprehensive analytics help improve service delivery and community satisfaction
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose your role to access the appropriate dashboard and start making a difference in your community.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto justify-center">
            <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-[#FAC638]">For Contractors</CardTitle>
                <CardDescription>Manage assigned tasks and update progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full rounded-2xl bg-[#FAC638] text-black hover:bg-[#e5b82f]">
                  <Link href="/contractor">Access Contractor Dashboard</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-[#FAC638]">For Administrators</CardTitle>
                <CardDescription>Oversee operations and analyze performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full rounded-2xl bg-[#FAC638] text-black hover:bg-[#e5b82f]">
                  <Link href="/admin">Access Admin Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
