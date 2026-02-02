import type { JSX } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EditorProvider } from "@/components/providers/editor-provider";
import { ScrollProvider } from "@/components/providers/scroll-provider";
import { HeroEditor } from "./hero-editor";

interface StoryProps {
    defaultTools?: ("case" | "hyphenation")[];
    forcedStyle?: "us" | "uk";
}

const meta: Meta<StoryProps> = {
    title: "Features/HeroEditor",
    component: (props: StoryProps): JSX.Element => {
        return (
            <EditorProvider>
                <ScrollProvider>
                    <HeroEditor {...props} />
                </ScrollProvider>
            </EditorProvider>
        );
    },
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    args: {
        defaultTools: ["case", "hyphenation"],
    },
};

export const UsTitleCase: Story = {
    args: {
        defaultTools: ["case"],
        forcedStyle: "us",
    },
};

export const UkSentenceCase: Story = {
    args: {
        defaultTools: ["case"],
        forcedStyle: "uk",
    },
};

export const HyphenationOnly: Story = {
    args: {
        defaultTools: ["hyphenation"],
    },
};
