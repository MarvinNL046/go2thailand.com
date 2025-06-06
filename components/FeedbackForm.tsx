import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

interface FeedbackFormProps {
  pageTitle: string;
  pageUrl: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ pageTitle, pageUrl }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [emailOptin, setEmailOptin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating || !message.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          message: message.trim(),
          email: email.trim() || undefined,
          emailOptin: email.trim() ? emailOptin : false,
          page_url: pageUrl,
          page_title: pageTitle,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="my-8">
        <CardContent className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Thank You for Your Feedback!</h3>
          <p className="text-gray-600">Your input helps us improve Go2 Thailand.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Was this page helpful?</CardTitle>
        <CardDescription>
          Let us know how we can improve this travel guide
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Rate this page
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Show additional fields after rating */}
          {rating > 0 && (
            <>
              {/* Message */}
              <div>
                <label htmlFor="feedback-message" className="block text-sm font-medium mb-2">
                  Tell us more (required)
                </label>
                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  rows={3}
                  placeholder={
                    rating <= 3
                      ? "What could we improve?"
                      : "What did you like about this page?"
                  }
                  required
                />
              </div>

              {/* Email (optional) */}
              <div>
                <label htmlFor="feedback-email" className="block text-sm font-medium mb-2">
                  Email (optional)
                </label>
                <Input
                  id="feedback-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
                {email && (
                  <div className="mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={emailOptin}
                        onChange={(e) => setEmailOptin(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">
                        Keep me updated about Go2 Thailand travel tips
                      </span>
                    </label>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  We'll only use this if we need to follow up on your feedback
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                disabled={!message.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Feedback
                  </>
                )}
              </Button>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;