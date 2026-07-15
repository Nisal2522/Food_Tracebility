import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Flag, AlertTriangle, Headset, X, MessageSquareWarning, CheckCircle2 } from "lucide-react";

type FieldConfig = {
  key: string;
  label: string;
  type: "textarea" | "text";
  placeholder: string;
  required: boolean;
};

type ActionConfig = {
  label: string;
  icon: typeof Flag;
  color: string;
  fields: FieldConfig[];
};

const ACTIONS: ActionConfig[] = [
  {
    label: "Report Fake Product",
    icon: Flag,
    color: "bg-red-500",
    fields: [
      {
        key: "details",
        label: "What makes you think this product is fake?",
        type: "textarea",
        placeholder: "e.g. QR code looked tampered with, packaging seal broken...",
        required: true,
      },
      {
        key: "location",
        label: "Where did you purchase it? (optional)",
        type: "text",
        placeholder: "Store name or location",
        required: false,
      },
    ],
  },
  {
    label: "Report Damage",
    icon: AlertTriangle,
    color: "bg-amber-500",
    fields: [
      {
        key: "details",
        label: "Describe the damage",
        type: "textarea",
        placeholder: "e.g. Packaging torn, product spoiled, bruised on arrival...",
        required: true,
      },
    ],
  },
  {
    label: "Contact Support",
    icon: Headset,
    color: "bg-blue-500",
    fields: [
      {
        key: "message",
        label: "How can we help?",
        type: "textarea",
        placeholder: "Type your question or issue...",
        required: true,
      },
      {
        key: "contact",
        label: "Your email or phone",
        type: "text",
        placeholder: "So we can get back to you",
        required: true,
      },
    ],
  },
];

export function ReportFAB() {
  const [open, setOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionConfig | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [submittedAction, setSubmittedAction] = useState<ActionConfig | null>(null);

  const openForm = (action: ActionConfig) => {
    setOpen(false);
    setFormValues({});
    setSubmittedAction(null);
    setActiveAction(action);
  };

  const closeForm = () => {
    setActiveAction(null);
    setSubmittedAction(null);
  };

  const canSubmit =
    !!activeAction &&
    activeAction.fields
      .filter((f) => f.required)
      .every((f) => (formValues[f.key] ?? "").trim().length > 0);

  const handleSubmit = () => {
    if (!activeAction || !canSubmit) return;
    setSubmittedAction(activeAction);
    setFormValues({});
  };

  return (
    <>
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open &&
            ACTIONS.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 12, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => openForm(action)}
                className="flex items-center gap-2.5 rounded-full border border-white/60 bg-white/90 py-2.5 pl-4 pr-3 shadow-lg backdrop-blur-md transition-transform hover:scale-105"
              >
                <span className="text-sm font-medium text-gray-800">{action.label}</span>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${action.color}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </span>
              </motion.button>
            ))}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.92 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl shadow-emerald-300/50"
        >
          <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.2 }}>
            {open ? <X className="h-6 w-6" /> : <MessageSquareWarning className="h-6 w-6" />}
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence>
        {activeAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-[20px] border border-white/60 bg-white p-5 shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {submittedAction ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-4 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.05 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100"
                    >
                      <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </motion.div>
                    <h3
                      className="mt-4 text-base font-bold text-gray-900"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Submitted successfully
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-500">
                      Your {submittedAction.label.toLowerCase()} request has been received — our team will follow up shortly.
                    </p>
                    <button
                      type="button"
                      onClick={closeForm}
                      className="mt-5 w-full rounded-full bg-gradient-to-br from-emerald-500 to-green-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${activeAction.color}`}>
                          <activeAction.icon className="h-4 w-4 text-white" />
                        </span>
                        <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {activeAction.label}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={closeForm}
                        aria-label="Close"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <form
                      className="mt-4 space-y-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {activeAction.fields.map((field) => (
                        <label key={field.key} className="block">
                          <span className="mb-1 block text-xs font-medium text-gray-600">
                            {field.label}
                            {field.required && <span className="text-red-500"> *</span>}
                          </span>
                          {field.type === "textarea" ? (
                            <textarea
                              value={formValues[field.key] ?? ""}
                              onChange={(e) => setFormValues((v) => ({ ...v, [field.key]: e.target.value }))}
                              placeholder={field.placeholder}
                              rows={3}
                              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                            />
                          ) : (
                            <input
                              type="text"
                              value={formValues[field.key] ?? ""}
                              onChange={(e) => setFormValues((v) => ({ ...v, [field.key]: e.target.value }))}
                              placeholder={field.placeholder}
                              className="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                            />
                          )}
                        </label>
                      ))}

                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={closeForm}
                          className="flex-1 rounded-full border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!canSubmit}
                          className="flex-1 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
