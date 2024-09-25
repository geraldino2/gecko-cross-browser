import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import Toggle from "../components/ui/toggle";
import "../tailwind/styles.css";
import { defaultSettings } from "../shared/constants";
import InfoAlert from "../components/ui/info-alert";

export default function Popup() {
  const [settings, setSettings] = React.useState(defaultSettings);

  useEffect(() => {
    chrome.storage.local.get("settings", (items) => {
      setSettings(items.settings);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ settings });
  }, [settings]);

  return (
    <div className="min-w-[300px] p-4 bg-white">
      <p className="text-xl font-semibold mb-4">Settings</p>
      <hr className="mb-4" />
      <div className="space-y-4">
        <Toggle
          label="Search in Query Values"
          enabled={settings.scanners.searchQueryValues}
          onChange={() => {
            setSettings({
              ...settings,
              scanners: {
                ...settings.scanners,
                searchQueryValues: !settings.scanners.searchQueryValues,
              },
            });
          }}
        />
        <Toggle
          label="Search in Path"
          enabled={settings.scanners.searchPath}
          onChange={() => {
            setSettings({
              ...settings,
              scanners: {
                ...settings.scanners,
                searchPath: !settings.scanners.searchPath,
              },
            });
          }}
        />
        <Toggle
          label="Search for null/undefined"
          enabled={settings.scanners.searchNullUndefined}
          onChange={() => {
            setSettings({
              ...settings,
              scanners: {
                ...settings.scanners,
                searchNullUndefined: !settings.scanners.searchNullUndefined,
              },
            });
          }}
        />
      </div>
      <hr className="my-4" />
      <div className="space-y-4">
        <Toggle
          label="Partial Matching"
          enabled={settings.matching.partial}
          onChange={() => {
            setSettings({
              ...settings,
              matching: {
                ...settings.matching,
                partial: !settings.matching.partial,
              },
            });
          }}
        />
        <Toggle
          label="Clear Findings on Refresh"
          enabled={settings.display.clearOnRefresh}
          onChange={() => {
            setSettings({
              ...settings,
              display: {
                ...settings.display,
                clearOnRefresh: !settings.display.clearOnRefresh,
              },
            });
          }}
        />
        <Toggle
          label="Case Insensitive"
          enabled={settings.matching.caseInsensitive}
          onChange={() => {
            setSettings({
              ...settings,
              matching: {
                ...settings.matching,
                caseInsensitive: !settings.matching.caseInsensitive,
              },
            });
          }}
        />
      </div>
      <hr className="my-4" />
      <InfoAlert message="Open the DevTools Gecko panel to see the findings." />
    </div>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
} else {
  console.error("Root container not found");
}
