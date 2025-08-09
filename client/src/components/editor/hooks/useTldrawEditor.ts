import { useContext } from 'react';
import { useSignFlowContext } from '../../tldraw/SignFlowTools';

export const useTldrawEditor = () => {
  const context = useSignFlowContext();
  
  // Return default values if context is not available
  if (!context) {
    return {
      editor: null,
      setBackgroundImage: () => {},
      addToast: () => {},
    };
  }
  
  return {
    editor: context.editor,
    setBackgroundImage: context.setBackgroundImage,
    addToast: context.addToast,
  };
};
