import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Package, Clock, Mail, Truck, AlertCircle, CheckCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-automotive text-foreground mb-4">Return Policy</h1>
          <p className="text-lg text-muted-foreground mb-8">
            At Cuztomtuning, we are committed to ensuring your satisfaction with every purchase. 
            We have implemented a customer-friendly return policy to provide you with peace of mind.
          </p>

          <div className="space-y-6">
            {/* Timeframe */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">1. Timeframe</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• You have a generous window of 30 days from the date of receiving your item to request a return.</li>
                    <li>• Requests for returns made after the specified timeframe may not be accepted.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Eligibility */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">2. Eligibility</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• To be eligible for a return, the item must be in the same condition as when you received it.</li>
                    <li>• The product should be unused, unworn, and in its original packaging.</li>
                    <li>• Please ensure that all tags and accessories are included.</li>
                    <li>• A proof of purchase, such as a receipt or order confirmation, is required.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Return Request */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">3. Return Request</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• To initiate a return, please contact our customer support team at <a href="mailto:cuztomtuning@gmail.com" className="text-primary hover:underline">cuztomtuning@gmail.com</a>.</li>
                    <li>• Our team will guide you through the return process and provide you with the necessary instructions.</li>
                    <li>• Items returned without prior authorization may not be accepted.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Return Shipping */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Truck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">4. Return Shipping</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• If your return is accepted, we will provide you with a return shipping label and instructions.</li>
                    <li>• It is your responsibility to securely package the item and ship it back to us.</li>
                    <li>• We recommend using a trackable shipping method and considering insurance for the package.</li>
                    <li>• Please note that shipping costs for returns are the responsibility of the customer, unless the return is due to an error on our part.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Inspection and Processing */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Package className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">5. Inspection and Processing</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Once we receive your returned item, our team will inspect it to ensure it meets our return policy criteria.</li>
                    <li>• If the return is approved, we will process your refund.</li>
                    <li>• Please allow a reasonable time for the refund to be reflected in your original payment method.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Non-Returnable Items */}
            <Card className="p-6 border-destructive/50">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">6. Non-Returnable Items</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Certain items are non-returnable, including but not limited to custom-made or personalized products.</li>
                    <li>• For hygiene reasons, some products may not be eligible for return once opened.</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Exchanges */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Package className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">7. Exchanges</h2>
                  <p className="text-muted-foreground">
                    If you wish to exchange an item for a different size, color, or model, please contact our customer 
                    support team at <a href="mailto:cuztomtuning@gmail.com" className="text-primary hover:underline">cuztomtuning@gmail.com</a>. 
                    We will do our best to accommodate your request, subject to product availability.
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6 bg-primary/5">
              <h2 className="text-xl font-automotive text-foreground mb-3">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions or concerns regarding our return policy, please don't hesitate to reach out to our customer support team:
              </p>
              <div className="flex items-center gap-2 text-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:cuztomtuning@gmail.com" className="text-primary hover:underline">
                  cuztomtuning@gmail.com
                </a>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Returns;