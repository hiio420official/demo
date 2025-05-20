import { PluginConfig } from './types';
import { codeBlockPlugin } from './codeBlock';
import { undoPlugin, redoPlugin } from './history';
import { createImagePlugin } from './image';
import { createLinkPlugin } from './link';
import { orderedListPlugin, unorderedListPlugin } from './lists';
import { createTablePlugin } from './table';
import { boldPlugin, italicPlugin, underlinePlugin } from './textFormatting';
import { alignLeftPlugin, alignCenterPlugin, alignRightPlugin } from './alignment';

export const createPluginConfig = (): PluginConfig => {
  return {
    plugins: [
      undoPlugin,
      redoPlugin,
      boldPlugin,
      italicPlugin,
      underlinePlugin,
      alignLeftPlugin,
      alignCenterPlugin,
      alignRightPlugin,
      orderedListPlugin,
      unorderedListPlugin,
      codeBlockPlugin,
      createImagePlugin(),
      createLinkPlugin(),
      createTablePlugin(),
    ],
    modalPlugins: [
      createLinkPlugin(),
      createTablePlugin(),
    ],
  };
}; 