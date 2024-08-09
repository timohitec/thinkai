import { useEffect, useState } from "react";

interface Section {
  title: string;
  content: Array<Array<FormElementData>>;
}

interface FormElementData {
  label: string;
  type: string;
  width: number;
  id: string;
}

const Element = (props: { data: FormElementData }) => {
  const { label, type, width, id, value, highlight } = props.data;

  const { setFormValue } = props;
  const style = { flex: width, display: "flex", alignItems: "end" };

  if (type === "text") {
    <div style={style}>
      <p>{label}</p>
    </div>;
  }

  if (type === "iText") {
    return (
      <div style={style}>
        <div className="w-full">
          <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
          <input
            type="text"
            id={id}
            className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              highlight ? "bg-yellow-200" : "bg-gray-50"
            }`}
            placeholder=""
            value={value}
            onChange={(e) => setFormValue(id, e.target.value)}
          />
        </div>
      </div>
    );
  }

  if (type === "iTextfield") {
    return (
      <div style={style}>
        <div className="w-full">
          <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
          <textarea
            id={id}
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            value={value}
            onChange={(e) => setFormValue(id, e.target.value)}
          ></textarea>
        </div>
      </div>
    );
  }

  if (type === "iCheckbox") {
    return (
      <div className="flex items-center mb-4">
        <input
          id={id}
          type="checkbox"
          value={value}
          onChange={(e) => setFormValue(id, e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={id}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
    );
  }
};

export const Section = (props: { data: Section }) => {
  return (
    <div className="border-1 border p-4">
      <h5 className="mb-2">{props.data.title}</h5>
      {props.data.content?.map((row, index) => (
        <div
          key={`${props.data.title}_${index}`}
          className="flex mb-2"
          style={{ gap: 10 }}
        >
          {row.map((e, i) => (
            <Element
              data={e}
              key={`${props.data.title}_${index}_${i}`}
              setFormValue={props.setFormValue}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
