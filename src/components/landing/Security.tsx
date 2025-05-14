
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lock, ShieldCheck, FileCheck, ShieldX, Users } from "lucide-react";

const securityFeatures = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-green-400" />,
    title: "End-to-End Encryption",
    description: "All emails and sensitive data are encrypted in transit and at rest using industry-standard encryption protocols."
  },
  {
    icon: <Lock className="h-8 w-8 text-blue-400" />,
    title: "Secure Authentication",
    description: "Multi-factor authentication, SSO integration, and stringent access controls protect your account."
  },
  {
    icon: <FileCheck className="h-8 w-8 text-amber-400" />,
    title: "SOC 2 Compliant",
    description: "Our infrastructure and processes adhere to SOC 2 Type II standards for security, availability, and confidentiality."
  },
  {
    icon: <ShieldX className="h-8 w-8 text-purple-400" />,
    title: "Data Isolation",
    description: "Your AI model is trained only on your data, ensuring complete separation between organizations."
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-400" />,
    title: "Granular Permissions",
    description: "Control exactly who has access to what with role-based access controls and detailed audit logs."
  }
];

const certifications = [
  "GDPR Compliant", 
  "CCPA Compliant", 
  "ISO 27001", 
  "HIPAA Compliant"
];

const Security = () => {
  return (
    <section id="security" className="py-24 px-4 relative overflow-hidden border-t border-gray-800">
      <div className="hero-blur opacity-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShieldCheck className="h-5 w-5 text-green-400" />
            <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 px-3">
              Security
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Security is Our <span className="gradient-text">Top Priority</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security and compliance for organizations with the most stringent requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-12">
          <div>
            <Card className="bg-black/20 border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6">Enterprise Security Standards</h3>
              
              <div className="space-y-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0 bg-gray-900/50 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-black/20 border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Our Commitments</h3>
              <p className="text-gray-400 text-sm mb-6">
                We've built our platform with security at its core, not as an afterthought. Our security 
                program is designed to meet or exceed regulatory requirements and industry best practices.
              </p>
              
              <div className="bg-gray-900/50 rounded-lg p-5">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Lock size={16} />
                  Certifications & Compliance
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
            
            <Card className="bg-black/20 border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Data Privacy Controls</h3>
              <p className="text-gray-400 text-sm mb-4">
                Your data belongs to you. We provide comprehensive controls so you can manage:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Data retention periods with automatic deletion options
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Export and deletion of all organization data
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Detailed audit trails for all system access
                </li>
              </ul>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Need more details?</span>
                <a href="#" className="text-sm text-blue-400 hover:underline">View Security Whitepaper →</a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
