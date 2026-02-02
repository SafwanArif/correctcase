import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroEditor } from "./hero-editor";
import { EditorProvider } from "@/components/providers/editor-provider";
import { ScrollProvider } from "@/components/providers/scroll-provider";
import { UIProvider } from "@/components/providers/ui-provider";

// Mock Provider Wrapper
const MockProvider = ({ children }: { children: React.ReactNode }) => (
    <UIProvider>
        <ScrollProvider>
            <EditorProvider>
                <div className="p-10 w-full min-h-screen bg-surface flex items-center justify-center">
                    {children}
                </div>
            </EditorProvider>
        </ScrollProvider>
    </UIProvider>
);

const meta = {
    title: "Features/HeroEditor",
    component: HeroEditor,
    decorators: [
        (Story) => (
            <MockProvider>
                <Story />
            </MockProvider>
        ),
    ],
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof HeroEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        defaultTools: ["case", "hyphenation"],
    },
};

export const CompactMobile: Story = {
    parameters: {
        viewport: { defaultViewport: "mobile1" },
    },
};
