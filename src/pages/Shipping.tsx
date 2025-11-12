import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Package, Truck, Globe, MapPin, Mail, AlertCircle } from 'lucide-react';

const Shipping = () => {
  return (
    <>
      <Helmet>
        <title>Shipping Policy | Cuztomtuning</title>
        <meta name="description" content="Learn about our shipping policy, delivery times, costs, and international shipping options. Free shipping to lower 48 states with no minimum purchase required." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-automotive text-foreground mb-4">
                Shipping Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about our shipping and delivery
              </p>
            </div>

            {/* General Information */}
            <Card className="p-6 mb-6">
              <div className="flex items-start gap-4">
                <Package className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">General Information</h2>
                  <p className="text-muted-foreground mb-4">
                    In most cases, we will process and ship orders within 2 business days. Please note that we do not ship on weekends or holidays.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    From time to time there may be a stock discrepancy and we will not be able to fulfill all your items at the time of purchase. In this instance, we will contact you about whether you would like to await restocking of the back-ordered item(s) or if you would prefer for us to process a refund for the order.
                  </p>
                  <p className="text-muted-foreground">
                    All in-stock items ship from our California warehouse.
                  </p>
                </div>
              </div>
            </Card>

            {/* Shipping Cost & Terms */}
            <Card className="p-6 mb-6">
              <div className="flex items-start gap-4">
                <Truck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h2 className="text-xl font-automotive text-foreground mb-3">Shipping Cost & Terms</h2>
                  <p className="text-muted-foreground mb-6">
                    We offer free shipping to the lower 48 states (excluding APO addresses). No minimum purchase required. If deliveries are not successful and sent back, they may be subject to additional shipping charges.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Domestic Shipping */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Domestic Shipping</h3>
                      <p className="text-muted-foreground">
                        All U.S. standard orders qualify for free shipping and take approximately 7-14 business days to fully process, ship, and deliver.
                      </p>
                    </div>

                    {/* VI, PR, HI, AK, GU and APO */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">VI, PR, HI, AK, GU and APO Address Shipping</h3>
                      <p className="text-muted-foreground">
                        Additional shipping costs apply to orders outside the lower 48 states. Contact us for details before placing your order.
                      </p>
                    </div>

                    {/* International Shipping */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">International Shipping</h3>
                      <p className="text-muted-foreground">
                        Additional shipping costs apply to international orders. Duties and taxes are explained below.
                      </p>
                    </div>

                    {/* P.O. Box Shipping */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">P.O. Box Shipping</h3>
                      <p className="text-muted-foreground">
                        Shipping is only available via USPS. Not all items are accepted by this service (LARGE items are not accepted). We may require a physical address for P.O. Box orders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Modifying or Cancelling */}
            <Card className="p-6 mb-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">Modifying or Cancelling Your Order</h2>
                  <p className="text-muted-foreground">
                    If you wish to change or cancel an order after you've submitted it, please contact us at{' '}
                    <a 
                      href="mailto:support@cuztomtuning.com?subject=Order Modification Request&body=Please include your order number and details about the changes you'd like to make."
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "mailto:support@cuztomtuning.com?subject=Order Modification Request&body=Please include your order number and details about the changes you'd like to make.";
                      }}
                      className="text-primary underline font-medium break-all inline-block touch-manipulation pointer-events-auto relative z-10"
                    >
                      support@cuztomtuning.com
                    </a>{' '}
                    and we'll do our best to find the best solution.
                  </p>
                  <p className="text-muted-foreground mt-4">
                    If the order has been picked up by the shipping carrier from our location, we are not able to make any changes to the shipping address or the order.
                  </p>
                </div>
              </div>
            </Card>

            {/* Damaged Items */}
            <Card className="p-6 mb-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">Damaged Item in Transit or QC Issues</h2>
                  <p className="text-muted-foreground mb-4">
                    Once you receive your order, you have 7 calendar days from the delivery date to file a damage claim.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    If you received your item damaged from shipping or the product is defective, please take as many photos of the box and product as possible. Email photos to{' '}
                    <a 
                      href="mailto:support@cuztomtuning.com?subject=Damage Claim&body=Please include your order ID and attach photos of the damaged item and packaging."
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "mailto:support@cuztomtuning.com?subject=Damage Claim&body=Please include your order ID and attach photos of the damaged item and packaging.";
                      }}
                      className="text-primary underline font-medium break-all inline-block touch-manipulation pointer-events-auto relative z-10"
                    >
                      support@cuztomtuning.com
                    </a>{' '}
                    with your order ID, and we will determine if this was a shipping issue or quality control issue.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    If it's a QC issue, we will figure out a solution for both parties.
                  </p>
                  <p className="text-muted-foreground">
                    If the issue is from shipping, we would ask that you put the item back in its original box and a claim will be started immediately with the shipping carrier used.
                  </p>
                </div>
              </div>
            </Card>

            {/* Duties and Taxes */}
            <Card className="p-6 mb-6">
              <div className="flex items-start gap-4">
                <Globe className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-automotive text-foreground mb-3">Duties and Taxes</h2>
                  <p className="text-muted-foreground mb-4">
                    Import duties and taxes for international shipments may be liable to be paid upon arrival at the destination. Please note that in some cases products will not ship in the same box. Please plan accordingly.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    This varies by country, and we encourage you to be aware of these potential costs before placing an order with us that is outside of the U.S.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    If you refuse to pay duties and taxes upon arrival at your destination country, the goods will be returned to us at the customer's expense. The customer will receive a refund for the value of goods paid, minus the cost of the return shipping, provided the goods arrive at us in the original condition and are not damaged in any way.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    The cost of the initial shipping will not be refunded in this case.
                  </p>
                  <p className="text-muted-foreground">
                    If returned goods do not get to us for any reason, we cannot be held liable and reserve the right not to issue a refund for the goods. If you wish to cancel your order at any time before shipping, please{' '}
                    <a 
                      href="mailto:support@cuztomtuning.com?subject=Order Cancellation Request&body=Please include your order number."
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "mailto:support@cuztomtuning.com?subject=Order Cancellation Request&body=Please include your order number.";
                      }}
                      className="text-primary underline font-medium break-all inline-block touch-manipulation pointer-events-auto relative z-10"
                    >
                      contact us
                    </a>.
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact CTA */}
            <Card className="p-8 text-center bg-muted/50">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-automotive text-foreground mb-2">Have Questions?</h3>
              <p className="text-muted-foreground mb-4">
                Our team is here to help with any shipping inquiries.
              </p>
              <a 
                href="mailto:support@cuztomtuning.com?subject=Shipping Inquiry&body=Please describe your question or concern."
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:support@cuztomtuning.com?subject=Shipping Inquiry&body=Please describe your question or concern.";
                }}
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors touch-manipulation pointer-events-auto relative z-10"
              >
                Contact Us
              </a>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Shipping;
