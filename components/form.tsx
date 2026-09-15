"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { sendSuggest, type ComplainState } from "@/actions/supportAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/ui/spinner";

const subjects = [
  { value: "general", label: "General question" },
  { value: "concern", label: "A concern" },
  { value: "suggestion", label: "A suggestion" },
  { value: "support", label: "I need help with something" },
  { value: "other", label: "Something else" },
];

export function ContactForm() {
  const initialState: ComplainState = { ok: false, message: "" };
  const [state, formAction, isPending] = useActionState(
    sendSuggest,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  // Radix Select is controlled, so the reset below has to clear it explicitly.
  const [subject, setSubject] = useState("general");

  useEffect(() => {
    if (!state.message) return;
    if (state.ok) {
      toast.success(state.message);
      formRef.current?.reset();
      setSubject("general");
    } else {
      toast.error(state.message);
    }
  }, [state.ok, state.message]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Budi Santoso"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Your email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="subject">What is this about?</Label>
        <Select
          name="subject"
          value={subject}
          onValueChange={setSubject}
          required
        >
          <SelectTrigger id="subject" className="w-full">
            <SelectValue placeholder="Choose a topic" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Your message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us what is going on. The more detail you give, the better we can help."
          className="min-h-40 resize-y"
        />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ink-500">
          Your message goes to the THUISA committee inbox. We usually reply
          within a few days.
        </p>
        <Button
          type="submit"
          disabled={isPending}
          variant="brand"
          size="lg"
          className="shrink-0"
        >
          {isPending ? (
            <>
              <Spinner className="size-5" />
              Sending
            </>
          ) : (
            <>
              <Send aria-hidden />
              Send message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
