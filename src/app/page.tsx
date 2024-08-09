// src/app/page.tsx

// In Next.js, we need to add this line to the top of our file to declare a
// boundary between Server and Client Component modules.
"use client";

// import useState so that we can update the response we get from the API
import { useState, useEffect, useRef } from "react";
// import axios so we can easily send the user's input to our server
import axios from "axios";
import { AIIcon, UserIcon } from "@/components/Icons";
import { PointsLoader } from "@/components/Loader";
import { TextInput } from "@/components/Input";
import { Section } from "@/components/FormElements";
import "./globals.css";

interface Message {
  type: string;
  text: string;
  loading?: boolean;
}

const Message = ({ type, text, loading, options, handleSubmit }: Message) => {
  const Icon = type === "ai" ? AIIcon : UserIcon;
  return (
    <div className="flex-1 my-4 bg-white p-4 rounded">
      <div className="flex gap-3  text-gray-600 text-sm flex-1">
        {Icon}
        <p className="leading-relaxed">
          <span className="block font-bold text-gray-700">
            {type === "ai" ? "Simba" : "Ich"}{" "}
          </span>
          {loading && <PointsLoader />}
          {text}
        </p>
      </div>
      <div className="pl-10">
        {options?.map((e) => (
          <button
            key={e.id}
            onClick={() =>
              handleSubmit(`Bitte den ${e.name}`, { selectedForm: e.id })
            }
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 mr-2 mt-2"
          >
            {e.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: "ai", text: "Hallo, Wie kann ich Ihnen helfen?" },
  ]);

  const [value, setValue] = useState<string>("");
  const [showHighlights, setShowHighlights] = useState<boolean>(false);
  const [form, setForm] = useState<any>(null);

  const scrollRef = useRef();

  const setFormValue = (id, value, highlight) => {
    setForm((form) =>
      form.map((section) => ({
        ...section,
        content: section.content.map((row) =>
          row.map((el) => (el.id === id ? { ...el, value, highlight } : el))
        ),
      }))
    );
  };

  const resetFormHighlights = () => {
    setForm((form) =>
      form.map((section) => ({
        ...section,
        content: section.content.map((row) =>
          row.map((el) => ({ ...el, highlight: false }))
        ),
      }))
    );
    setShowHighlights(false);
  };

  useEffect(() => {
    if (showHighlights) setTimeout(() => resetFormHighlights(), 1000);
  }, [showHighlights]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = async (m, extraData) => {
    setValue("");
    setMessages((messages) => [...messages, { type: "user", text: m }]);
    setMessages((messages) => [
      ...messages,
      { type: "ai", text: "", loading: true },
    ]);
    const url = form ? "/chat" : "/selector";
    const response = await axios.post(url, { message: m, ...extraData });
    setMessages((messages) =>
      messages.map((e, i) =>
        i === messages.length - 1
          ? {
              ...e,
              text: response.data.message,
              loading: false,
              options: response.data.options,
            }
          : e
      )
    );

    if (response.data.form) {
      setForm(response.data.form);
    }

    if (response.data.updates) {
      Object.entries(response.data.updates).forEach(([id, value]) => {
        setFormValue(id, value, true);
      });
      setShowHighlights(true);
    }
  };

  return (
    <div className="flex h-full">
      <div
        className="flex flex-col flex-1 bg-slate-300 p-6 overflow-y-auto"
        ref={scrollRef}
      >
        {/* <!-- Chat Container --> */}
        <div
          className="pr-4 flex-1"
          style={{ minWidth: "100%", display: "table" }}
        >
          {messages.map(({ type, text, loading, options }, index) => (
            <Message
              key={index}
              type={type}
              text={text}
              options={options}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          ))}
          <div ref={scrollRef}></div>
        </div>
        {/* <!-- Input box  --> */}
        <div className="flex items-center pt-0">
          <div className="flex items-center justify-center w-full space-x-2">
            <TextInput
              placeholder="Gib deine Nachricht ein"
              value={value}
              onChange={onChange}
            />
            <button
              onClick={() => handleSubmit(value)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
            >
              Senden
            </button>
          </div>
        </div>
      </div>
      {!!form && (
        <div className="flex-1 p-6 overflow-y-auto">
          {form.map((section, index) => (
            <Section
              data={section}
              key={`section_${index}`}
              setFormValue={setFormValue}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
