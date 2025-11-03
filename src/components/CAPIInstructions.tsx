import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

export const CAPIInstructions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Complete CAPI Implementation Guide with GTM
      </h2>
      <p className="text-gray-600 mb-8">
        Follow this comprehensive guide to implement Facebook Conversions API using Google Tag Manager.
        The JSON Generator tool can speed up some of these steps, but this is the complete process.
      </p>

      <div className="space-y-8">
        {/* Phase 1: Prerequisites */}
        <section>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
            Prerequisites & Setup
          </h3>
          <div className="space-y-3 ml-10">
            <TaskItem task="Create or access your Facebook Business Manager account" />
            <TaskItem task="Set up a Facebook Pixel (if not already created) in Events Manager" />
            <TaskItem task="Generate a Conversions API Access Token from Events Manager > Settings > Conversions API" />
            <TaskItem task="Note your Pixel ID (found in Events Manager)" />
            <TaskItem task="Create a Test Event Code in Events Manager for testing (optional but recommended)" />
            <TaskItem task="Ensure you have Google Tag Manager installed on your website" />
            <TaskItem task="Set up a Google Tag Manager Server-Side Container (tagging server)" />
            <TaskItem task="Verify your GTM Server Container URL is active" />
          </div>
        </section>

        {/* Phase 2: Configure Web Container */}
        <section>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
            Web Container Configuration
          </h3>
          <div className="space-y-3 ml-10">
            <TaskItem task="Log into Google Tag Manager and select your Web Container" />
            <TaskItem task="Create a new GA4 Configuration Tag with your Measurement ID" />
            <TaskItem task="Configure Server Container URL in GA4 tag settings (transport_url)" />
            <TaskItem task="Set up Facebook Pixel Base Code tag (if not already present)" />
            <TaskItem task="Create triggers for key events: page_view, form_start, form_submit, lead_submit, etc." />
            <TaskItem task="Set up Data Layer variables for user data (email, phone, name, address)" />
            <TaskItem task="Create custom JavaScript variables to capture form field data using CSS selectors" />
            <TaskItem task="Configure event tags to fire on appropriate triggers" />
            <TaskItem task="Add enhanced measurement parameters to GA4 events" />
            <TaskItem task="Test all tags in Preview mode before publishing" />
            <TaskItem task="Publish the Web Container after verification" />
          </div>
        </section>

        {/* Phase 3: Configure Server Container */}
        <section>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
            Server Container Configuration
          </h3>
          <div className="space-y-3 ml-10">
            <TaskItem task="Open your GTM Server Container" />
            <TaskItem task="Install the Facebook Conversions API tag template from Gallery" />
            <TaskItem task="Create a new Facebook CAPI tag" />
            <TaskItem task="Enter your Pixel ID and Access Token in the tag configuration" />
            <TaskItem task="Add Test Event Code if using (for testing)" />
            <TaskItem task="Configure Event Name mapping (map GA4 events to Facebook standard events)" />
            <TaskItem task="Set up User Data parameters mapping (email, phone, fn, ln, ct, st, zp, country)" />
            <TaskItem task="Enable automatic hashing for PII data" />
            <TaskItem task="Configure event_id for deduplication between pixel and CAPI" />
            <TaskItem task="Set up trigger to fire on all incoming GA4 events or specific events" />
            <TaskItem task="Configure Custom Data parameters if needed" />
            <TaskItem task="Enable debug mode for initial testing" />
            <TaskItem task="Test the server tag in Preview mode" />
            <TaskItem task="Publish the Server Container" />
          </div>
        </section>

        {/* Phase 4: Data Collection Setup */}
        <section>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">4</span>
            Data Collection & Mapping
          </h3>
          <div className="space-y-3 ml-10">
            <TaskItem task="Identify all form fields that capture user information" />
            <TaskItem task="Create CSS selectors for each user data field (email, phone, name, etc.)" />
            <TaskItem task="Set up separate selectors for different form types (e.g., main site vs Unbounce)" />
            <TaskItem task="Create GTM variables to extract data from forms on submission" />
            <TaskItem task="Implement data layer pushes for form interactions" />
            <TaskItem task="Configure proper data normalization (lowercase emails, format phone numbers)" />
            <TaskItem task="Ensure GDPR/privacy compliance for data collection" />
            <TaskItem task="Implement consent mode if required for your region" />
            <TaskItem task="Test data capture on all form types" />
          </div>
        </section>

        {/* Phase 5: Event Mapping */}
        <section>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">5</span>
            Event Mapping & Configuration
          </h3>
          <div className="space-y-3 ml-10">
            <TaskItem task="Map website events to Facebook Standard Events (Lead, PageView, Contact, etc.)" />
            <TaskItem task="Configure page_view event for all page loads" />
            <TaskItem task="Set up form_start event when users begin filling forms" />
            <TaskItem task="Configure form_submit event for successful submissions" />
            <TaskItem task="Set up lead_submit for lead generation events" />
            <TaskItem task="Configure contact_click for contact button interactions" />
            <TaskItem task="Add custom parameters to events as needed" />
            <TaskItem task="Ensure event_id is consistent between pixel and CAPI for deduplication" />
            <TaskItem task="Test each event type triggers correctly" />
          </div>
        </section>

        {/* Phase 6: Testing & Validation */}
        <section>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">6</span>
            Testing & Validation
          </h3>
          <div className="space-y-3 ml-10">
            <TaskItem task="Open Facebook Events Manager Test Events tool" />
            <TaskItem task="Use GTM Preview mode to test tags" />
            <TaskItem task="Verify events appear in Test Events within 1-2 minutes" />
            <TaskItem task="Check that user data parameters are being received correctly" />
            <TaskItem task="Verify event_id matches between browser and server events" />
            <TaskItem task="Confirm proper hashing of PII data" />
            <TaskItem task="Test on different form types (main site, Unbounce, etc.)" />
            <TaskItem task="Test across different browsers and devices" />
            <TaskItem task="Verify Match Quality score in Events Manager (aim for high quality)" />
            <TaskItem task="Check for any error messages or warnings in Test Events" />
            <TaskItem task="Validate event parameters are correctly formatted" />
            <TaskItem task="Test deduplication is working (should see events, not duplicates)" />
          </div>
        </section>

        {/* Phase 7: Quality Assurance */}
        <section>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">7</span>
            Quality Assurance Checklist
          </h3>
          <div className="space-y-3 ml-10">
            <TaskItem task="Event Match Quality: Check score is 6.0+ (higher is better)" />
            <TaskItem task="Verify multiple matching parameters per event (email, phone, name, etc.)" />
            <TaskItem task="Confirm events are attributed to correct source" />
            <TaskItem task="Check that custom events map to standard Facebook events" />
            <TaskItem task="Verify action_source is set to 'website'" />
            <TaskItem task="Confirm event_time is accurate" />
            <TaskItem task="Check that fbp and fbc cookies are being captured" />
            <TaskItem task="Verify user_agent and IP address are passed correctly" />
            <TaskItem task="Confirm no sensitive data is being sent unhashed" />
            <TaskItem task="Test opt-out/consent mechanisms work properly" />
          </div>
        </section>

        {/* Phase 8: Go Live */}
        <section>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">8</span>
            Go Live & Monitoring
          </h3>
          <div className="space-y-3 ml-10">
            <TaskItem task="Remove Test Event Code from production configuration" />
            <TaskItem task="Publish final versions of Web and Server containers" />
            <TaskItem task="Monitor Events Manager for 24-48 hours after launch" />
            <TaskItem task="Check that events are flowing consistently" />
            <TaskItem task="Verify no sudden drops in event volume" />
            <TaskItem task="Monitor Match Quality scores remain high" />
            <TaskItem task="Set up regular monitoring schedule (weekly checks)" />
            <TaskItem task="Document your configuration for future reference" />
            <TaskItem task="Train team members on monitoring and troubleshooting" />
            <TaskItem task="Create runbook for common issues and fixes" />
          </div>
        </section>

        {/* Phase 9: Optimization */}
        <section>
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">9</span>
            Ongoing Optimization
          </h3>
          <div className="space-y-3 ml-10">
            <TaskItem task="Review Match Quality scores monthly" />
            <TaskItem task="Add additional user data parameters when possible" />
            <TaskItem task="Optimize event triggers for better coverage" />
            <TaskItem task="Review and update event mappings as business needs change" />
            <TaskItem task="Monitor for new Facebook CAPI features and capabilities" />
            <TaskItem task="Update GTM templates when new versions are released" />
            <TaskItem task="A/B test different configurations if needed" />
            <TaskItem task="Document changes and their impact" />
            <TaskItem task="Share insights with marketing team for campaign optimization" />
          </div>
        </section>

        {/* Common Issues */}
        <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Common Issues & Solutions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900">Events not appearing in Test Events</h4>
              <p className="text-sm text-gray-700 ml-4">→ Check Access Token is correct, verify Server Container URL, ensure triggers are firing</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Low Match Quality scores</h4>
              <p className="text-sm text-gray-700 ml-4">→ Add more user data parameters, verify proper hashing, check data formatting</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Duplicate events</h4>
              <p className="text-sm text-gray-700 ml-4">→ Verify event_id is being passed and is identical for pixel and CAPI events</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Form data not capturing</h4>
              <p className="text-sm text-gray-700 ml-4">→ Verify CSS selectors are correct, check timing of data capture, test different form types</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Server Container errors</h4>
              <p className="text-sm text-gray-700 ml-4">→ Check server billing/quota, verify URL is accessible, review server logs</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Best Practices</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Always use Test Event Code during development and testing phases</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Implement proper consent management before collecting user data</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Use consistent event naming conventions across platforms</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Document all CSS selectors and their purpose</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Keep access tokens secure (never commit to version control)</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Monitor Events Manager regularly after launch</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Send as many matching parameters as possible for better attribution</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Set up alerts for sudden drops in event volume</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const TaskItem: React.FC<{ task: string }> = ({ task }) => {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
      <span className="text-gray-700">{task}</span>
    </div>
  );
};

