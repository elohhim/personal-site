import sdk from "@stackblitz/sdk";
import { EmbedOptions } from "@stackblitz/sdk/typings/interfaces";
import { useEffect } from "react";

interface EmbedStackblitzProps {
  projectId: string;
  embedOptions?: EmbedOptions
}

const defaultEmbedOptions: EmbedOptions =  {
  forceEmbedLayout: true,
  view: "preview",
  hideExplorer: true,
  hideNavigation: true,
  hideDevTools: true,
};

export default function EmbedStackblitz({ projectId, embedOptions }: EmbedStackblitzProps) {

  useEffect(() => {
    console.log(embedOptions);
    const effectiveEmbedOptions: EmbedOptions = {
      ...defaultEmbedOptions,
      ...embedOptions
    }
    sdk.embedProjectId("host", projectId,effectiveEmbedOptions);
  }, []);
  return <div id="host">Hello</div>;
}
