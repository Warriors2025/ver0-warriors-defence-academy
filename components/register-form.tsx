"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  BookOpen,
  FileText,
  CreditCard,
  Phone,
  Mail,
} from "lucide-react"

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Course Selection", icon: BookOpen },
  { id: 3, title: "Education Details", icon: FileText },
  { id: 4, title: "Confirmation", icon: CreditCard },
]

const courses = [
  { id: "nda", name: "NDA Course", duration: "6-12 Months" },
  { id: "nda-foundation", name: "NDA Foundation", duration: "2-3 Years" },
  { id: "cds", name: "CDS Course", duration: "6 Months" },
  { id: "ssb", name: "SSB Interview Training", duration: "21 Days" },
  { id: "afcat", name: "AFCAT Course", duration: "4-6 Months" },
  { id: "navy-agniveer", name: "Indian Navy Agniveer", duration: "3-4 Months" },
  { id: "airforce-xy", name: "Airforce X/Y Group", duration: "4-6 Months" },
  { id: "mns", name: "MNS Course", duration: "3-6 Months" },
]

const batchTypes = [
  { id: "offline", name: "Offline (On-Campus)", description: "Full-time residential program" },
  { id: "online", name: "Online Classes", description: "Live interactive sessions" },
  { id: "hybrid", name: "Hybrid Mode", description: "Combination of online and offline" },
]

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    course: "",
    batchType: "",
    preferredBatch: "",
    hostelRequired: false,
    highestQualification: "",
    board: "",
    passingYear: "",
    percentage: "",
    schoolName: "",
    termsAccepted: false,
  })

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const nextStep = () => { if (currentStep < 4) setCurrentStep(currentStep + 1) }
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1) }
  const handleSubmit = () => setIsSubmitted(true)

  const progressValue = (currentStep / steps.length) * 100

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Registration Successful!
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for registering with Warriors Defence Academy. Our team will
          contact you shortly to confirm your enrollment and provide further details.
        </p>

        <Card className="bg-secondary/50 border-0 mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">What&apos;s Next?</h3>
            <ul className="space-y-3 text-left text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>You will receive a confirmation email with your registration details</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Our counselor will call you within 24 hours for document verification</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Complete the fee payment to confirm your seat in the batch</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
          <Link href="/courses">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <Progress value={progressValue} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-6 md:p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Personal Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="Enter first name" value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)} className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Enter last name" value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)} className="h-12" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="Enter email" value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)} className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="Enter phone number" value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)} className="h-12" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input id="dob" type="date" value={formData.dob}
                    onChange={(e) => updateFormData("dob", e.target.value)} className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <RadioGroup value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}
                    className="flex gap-6 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="font-normal">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="font-normal">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea id="address" placeholder="Enter your full address" value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)} rows={3} />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" placeholder="City" value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)} className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input id="state" placeholder="State" value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)} className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input id="pincode" placeholder="Pincode" value={formData.pincode}
                    onChange={(e) => updateFormData("pincode", e.target.value)} className="h-12" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Course Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Course Selection</h2>

              <div className="space-y-2">
                <Label>Select Course *</Label>
                <RadioGroup value={formData.course} onValueChange={(value) => updateFormData("course", value)}
                  className="grid md:grid-cols-2 gap-4 mt-2">
                  {courses.map((course) => (
                    <div key={course.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        formData.course === course.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}>
                      <RadioGroupItem value={course.id} id={course.id} />
                      <div className="flex-1">
                        <Label htmlFor={course.id} className="font-medium cursor-pointer">{course.name}</Label>
                        <p className="text-sm text-muted-foreground">{course.duration}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Batch Type *</Label>
                <RadioGroup value={formData.batchType} onValueChange={(value) => updateFormData("batchType", value)}
                  className="grid md:grid-cols-3 gap-4 mt-2">
                  {batchTypes.map((batch) => (
                    <div key={batch.id}
                      className={`flex flex-col p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        formData.batchType === batch.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={batch.id} id={batch.id} />
                        <Label htmlFor={batch.id} className="font-medium cursor-pointer">{batch.name}</Label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 ml-6">{batch.description}</p>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="preferredBatch">Preferred Batch Month</Label>
                  <Select value={formData.preferredBatch} onValueChange={(value) => updateFormData("preferredBatch", value)}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select month" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="april-2026">April 2026</SelectItem>
                      <SelectItem value="may-2026">May 2026</SelectItem>
                      <SelectItem value="june-2026">June 2026</SelectItem>
                      <SelectItem value="july-2026">July 2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Hostel Required?</Label>
                  <div className="flex items-center space-x-2 h-12">
                    <Checkbox id="hostel" checked={formData.hostelRequired}
                      onCheckedChange={(checked) => updateFormData("hostelRequired", checked === true)} />
                    <Label htmlFor="hostel" className="font-normal cursor-pointer">
                      Yes, I need hostel accommodation
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Education Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Education Details</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="qualification">Highest Qualification *</Label>
                  <Select value={formData.highestQualification} onValueChange={(value) => updateFormData("highestQualification", value)}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select qualification" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">Class 10th</SelectItem>
                      <SelectItem value="12th">Class 12th</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="post-graduate">Post Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="board">Board/University *</Label>
                  <Select value={formData.board} onValueChange={(value) => updateFormData("board", value)}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select board" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbse">CBSE</SelectItem>
                      <SelectItem value="icse">ICSE</SelectItem>
                      <SelectItem value="state">State Board</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passingYear">Passing Year *</Label>
                  <Select value={formData.passingYear} onValueChange={(value) => updateFormData("passingYear", value)}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Select year" /></SelectTrigger>
                    <SelectContent>
                      {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="percentage">Percentage/CGPA *</Label>
                  <Input id="percentage" placeholder="Enter percentage or CGPA" value={formData.percentage}
                    onChange={(e) => updateFormData("percentage", e.target.value)} className="h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolName">School/College Name *</Label>
                <Input id="schoolName" placeholder="Enter your school or college name" value={formData.schoolName}
                  onChange={(e) => updateFormData("schoolName", e.target.value)} className="h-12" />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Review &amp; Confirm</h2>

              <div className="space-y-6">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Name:</span>{" "}<span className="font-medium">{formData.firstName} {formData.lastName}</span></div>
                    <div><span className="text-muted-foreground">Email:</span>{" "}<span className="font-medium">{formData.email}</span></div>
                    <div><span className="text-muted-foreground">Phone:</span>{" "}<span className="font-medium">{formData.phone}</span></div>
                    <div><span className="text-muted-foreground">DOB:</span>{" "}<span className="font-medium">{formData.dob}</span></div>
                    <div className="md:col-span-2">
                      <span className="text-muted-foreground">Address:</span>{" "}
                      <span className="font-medium">{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Course Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Course:</span>{" "}<span className="font-medium">{courses.find(c => c.id === formData.course)?.name || "-"}</span></div>
                    <div><span className="text-muted-foreground">Batch Type:</span>{" "}<span className="font-medium">{batchTypes.find(b => b.id === formData.batchType)?.name || "-"}</span></div>
                    <div><span className="text-muted-foreground">Preferred Batch:</span>{" "}<span className="font-medium">{formData.preferredBatch || "-"}</span></div>
                    <div><span className="text-muted-foreground">Hostel:</span>{" "}<span className="font-medium">{formData.hostelRequired ? "Yes" : "No"}</span></div>
                  </div>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Education Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Qualification:</span>{" "}<span className="font-medium">{formData.highestQualification || "-"}</span></div>
                    <div><span className="text-muted-foreground">Board:</span>{" "}<span className="font-medium">{formData.board || "-"}</span></div>
                    <div><span className="text-muted-foreground">Passing Year:</span>{" "}<span className="font-medium">{formData.passingYear || "-"}</span></div>
                    <div><span className="text-muted-foreground">Percentage:</span>{" "}<span className="font-medium">{formData.percentage || "-"}</span></div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Checkbox id="terms" checked={formData.termsAccepted}
                    onCheckedChange={(checked) => updateFormData("termsAccepted", checked === true)} />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I confirm that all the information provided is accurate. I agree to the{" "}
                    <Link href="/terms" className="text-primary underline">Terms &amp; Conditions</Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>{" "}
                    of Warriors Defence Academy.
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button type="button" onClick={nextStep} className="gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={!formData.termsAccepted}
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <CheckCircle className="h-4 w-4" />
                Submit Registration
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">Need help with registration?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+919452245729" className="flex items-center justify-center gap-2 text-primary hover:underline">
            <Phone className="h-4 w-4" />
            +91 94522 45729
          </a>
          <a href="mailto:info@warriorsdefenceacademy.com" className="flex items-center justify-center gap-2 text-primary hover:underline">
            <Mail className="h-4 w-4" />
            info@warriorsdefenceacademy.com
          </a>
        </div>
      </div>
    </div>
  )
}
