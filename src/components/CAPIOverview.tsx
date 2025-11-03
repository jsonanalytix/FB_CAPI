import React from 'react';
import { Globe, Server, Brain, Shield, TrendingUp, Users, MousePointer, Database, Zap, CheckCircle2 } from 'lucide-react';

export const CAPIOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Understanding Facebook Conversions API (CAPI)
      </h2>
      <p className="text-gray-600 mb-8 text-lg">
        A non-technical guide to what CAPI is, why it matters, and how it works
      </p>

      {/* What is CAPI */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">What is CAPI?</h3>
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
          <p className="text-gray-700 text-lg leading-relaxed">
            Facebook Conversions API (CAPI) is a tool that allows your website's server to send information 
            directly to Facebook about customer actions—like visiting a page, submitting a form, or making 
            a purchase. Think of it as a direct phone line between your website and Facebook, instead of 
            relying only on cookies and tracking pixels in people's browsers.
          </p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">Why CAPI Matters</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <BenefitCard
            icon={<Shield className="w-8 h-8" />}
            title="Privacy Changes"
            description="iOS 14+ and browser changes block many tracking cookies. CAPI works around these limitations by sending data directly from your server."
            color="purple"
          />
          <BenefitCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Better Performance"
            description="More accurate tracking means Facebook can optimize your ads better, leading to improved campaign results and lower costs."
            color="green"
          />
          <BenefitCard
            icon={<Brain className="w-8 h-8" />}
            title="Smarter Targeting"
            description="With more complete data, Facebook's AI can find better audiences and make smarter decisions about who to show your ads to."
            color="orange"
          />
          <BenefitCard
            icon={<Database className="w-8 h-8" />}
            title="More Complete Data"
            description="Capture conversions that might be missed by the pixel alone, giving you a fuller picture of your marketing effectiveness."
            color="blue"
          />
        </div>
      </section>

      {/* How It Works - Visual Flow */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">How CAPI Works: The Journey</h3>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
          <div className="space-y-6">
            {/* Step 1 */}
            <FlowStep
              number={1}
              icon={<MousePointer className="w-6 h-6" />}
              title="User Action"
              description="A visitor does something on your website—views a page, fills out a form, clicks a button, or makes a purchase."
              example="Example: Sarah submits a contact form with her email and phone number."
            />

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-blue-400 text-2xl">↓</div>
            </div>

            {/* Step 2 */}
            <FlowStep
              number={2}
              icon={<Globe className="w-6 h-6" />}
              title="Browser Pixel (Traditional)"
              description="The Facebook Pixel in the browser tries to track this action using cookies. However, this can be blocked by privacy settings, ad blockers, or browser restrictions."
              example="Example: The pixel fires but may be blocked by Sarah's privacy settings."
              warning
            />

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-blue-400 text-2xl">↓</div>
            </div>

            {/* Step 3 */}
            <FlowStep
              number={3}
              icon={<Server className="w-6 h-6" />}
              title="Server-Side Tracking (CAPI)"
              description="Your server captures the same information and sends it directly to Facebook through a secure API connection. This method can't be blocked by browser settings."
              example="Example: Your server securely sends Sarah's (hashed) information directly to Facebook."
              highlight
            />

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-blue-400 text-2xl">↓</div>
            </div>

            {/* Step 4 */}
            <FlowStep
              number={4}
              icon={<Brain className="w-6 h-6" />}
              title="Facebook Receives Data"
              description="Facebook receives the conversion data from both sources (if available) and uses deduplication to count it as one event. It then uses this data to optimize your ad campaigns."
              example="Example: Facebook knows Sarah converted and can show your ads to similar people."
            />

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-blue-400 text-2xl">↓</div>
            </div>

            {/* Step 5 */}
            <FlowStep
              number={5}
              icon={<TrendingUp className="w-6 h-6" />}
              title="Improved Results"
              description="With better data, Facebook's algorithms work more effectively, helping you reach the right people and get better results from your advertising spend."
              example="Example: Your ads perform better because Facebook understands who converts."
            />
          </div>
        </div>
      </section>

      {/* Key Components */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">Key Components Involved</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <ComponentCard
            title="Facebook Pixel"
            description="JavaScript code on your website that tracks actions in the browser (traditional method)"
            items={["Runs in visitor's browser", "Can be blocked by privacy tools", "Works with CAPI for backup"]}
          />
          <ComponentCard
            title="Your Website Server"
            description="Your web server that processes visitor actions and sends data to Facebook"
            items={["Processes form submissions", "Captures user data", "Sends to GTM Server"]}
            highlighted
          />
          <ComponentCard
            title="GTM Server Container"
            description="Google Tag Manager's server that acts as a middleman between your site and Facebook"
            items={["Receives data from your site", "Formats it for Facebook", "Sends to CAPI"]}
            highlighted
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <ComponentCard
            title="Facebook CAPI"
            description="Facebook's server-side API that receives conversion data directly from servers"
            items={["Receives server-side data", "Can't be blocked by browsers", "Provides better tracking"]}
            highlighted
          />
          <ComponentCard
            title="Google Tag Manager"
            description="Tool that manages tracking codes and helps coordinate data flow"
            items={["Manages web tags", "Coordinates data flow", "Simplifies implementation"]}
          />
        </div>
      </section>

      {/* Data That Gets Sent */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">What Information Gets Sent?</h3>
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                User Information (Hashed for Privacy)
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Email address (encrypted)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Phone number (encrypted)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  First and last name (encrypted)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  City, state, zip code (encrypted)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Event Information
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  What action occurred (page view, form submit, etc.)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  When it happened (timestamp)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Where it happened (page URL)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Browser and device information
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong className="text-blue-800">Privacy Note:</strong> All personal information (email, phone, name, address) 
              is automatically encrypted (hashed) before being sent to Facebook. This means the raw data is converted into 
              a secure code that can't be reversed, protecting user privacy while still allowing Facebook to match users 
              for ad targeting.
            </p>
          </div>
        </div>
      </section>

      {/* Real World Analogy */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">Real-World Analogy</h3>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
          <p className="text-gray-700 text-lg mb-4">
            <strong>Traditional Pixel (Browser Tracking)</strong> is like mailing a postcard:
          </p>
          <ul className="space-y-2 text-gray-700 ml-6 mb-6">
            <li>• Easy to send, but can get lost in the mail</li>
            <li>• Anyone can read it (privacy concerns)</li>
            <li>• May not arrive if recipient has mail blocking</li>
          </ul>
          
          <p className="text-gray-700 text-lg mb-4">
            <strong>CAPI (Server-Side Tracking)</strong> is like a direct phone call:
          </p>
          <ul className="space-y-2 text-gray-700 ml-6">
            <li>• Direct connection, more reliable</li>
            <li>• Private conversation (encrypted)</li>
            <li>• Can't be easily blocked or intercepted</li>
            <li>• Information arrives even if the postcard gets lost</li>
          </ul>
        </div>
      </section>

      {/* Business Impact */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">Business Impact</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <ImpactCard
            title="For Marketing Teams"
            items={[
              "More accurate conversion tracking",
              "Better campaign optimization",
              "Improved ROAS (Return on Ad Spend)",
              "Better audience targeting",
              "More reliable reporting"
            ]}
          />
          <ImpactCard
            title="For Sales Teams"
            items={[
              "Higher quality leads",
              "Better lead attribution",
              "More consistent lead flow",
              "Improved lead scoring",
              "Better conversion rates"
            ]}
          />
          <ImpactCard
            title="For Executives"
            items={[
              "Lower customer acquisition costs",
              "Improved marketing ROI",
              "Future-proof tracking solution",
              "Competitive advantage",
              "Compliance with privacy regulations"
            ]}
          />
        </div>
      </section>

      {/* Summary */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">In Summary</h3>
        <div className="space-y-3 text-lg">
          <p>
            ✓ CAPI sends conversion data directly from your server to Facebook, bypassing browser limitations
          </p>
          <p>
            ✓ It works alongside the traditional pixel to provide more complete and reliable tracking
          </p>
          <p>
            ✓ Better data means better ad performance and lower costs for your business
          </p>
          <p>
            ✓ It's essential in today's privacy-focused digital landscape
          </p>
          <p>
            ✓ While technical to set up, the business benefits far outweigh the implementation effort
          </p>
        </div>
      </section>
    </div>
  );
};

// Component helpers
const BenefitCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}> = ({ icon, title, description, color }) => {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
  };

  return (
    <div className={`${colors[color]} border-2 rounded-xl p-6`}>
      <div className="mb-3">{icon}</div>
      <h4 className="font-bold text-gray-900 mb-2 text-lg">{title}</h4>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const FlowStep: React.FC<{
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  example: string;
  warning?: boolean;
  highlight?: boolean;
}> = ({ number, icon, title, description, example, warning, highlight }) => {
  return (
    <div className={`${highlight ? 'bg-green-50 border-green-300' : warning ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-200'} border-2 rounded-xl p-6`}>
      <div className="flex items-start gap-4">
        <div className={`${highlight ? 'bg-green-500' : warning ? 'bg-yellow-500' : 'bg-blue-500'} text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold`}>
          {number}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-gray-600">{icon}</div>
            <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
          </div>
          <p className="text-gray-700 mb-3">{description}</p>
          <div className="bg-white bg-opacity-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600 italic">{example}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComponentCard: React.FC<{
  title: string;
  description: string;
  items: string[];
  highlighted?: boolean;
}> = ({ title, description, items, highlighted }) => {
  return (
    <div className={`${highlighted ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'} border-2 rounded-xl p-6`}>
      <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ImpactCard: React.FC<{
  title: string;
  items: string[];
}> = ({ title, items }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6">
      <h4 className="font-bold text-gray-900 mb-4 text-lg">{title}</h4>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-gray-700">
            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

