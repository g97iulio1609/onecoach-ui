/**
 * Dialog Component - React Native
 *
 * Cross-platform dialog using React Native Modal
 * Mobile-optimized, accessible
 */

import React, { useEffect } from 'react';
import type { TextInput as RNTextInput } from 'react-native';
import { View, Text, Modal, TextInput, StyleSheet, Pressable } from 'react-native';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react-native';
import { Button } from './button';
import {
  type DialogProps,
  getDialogTypeConfig,
  getDialogLabels,
  useDialogInput,
  useDialogHandlers,
} from './dialog.shared';

// Re-export types for convenience
export type { DialogType, DialogProps } from './dialog.shared';

export const Dialog = ({
  isOpen,
  onClose,
  type = 'alert',
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  defaultValue,
  placeholder,
  closeOnBackdropClick = false,
  inputValue: controlledInputValue,
  onInputChange,
}: DialogProps & { inputValue?: string; onInputChange?: (value: string) => void }) => {
  const inputRef = React.useRef<RNTextInput>(null);

  // Use shared hooks
  const { value: inputValue, setValue: setInputValue } = useDialogInput(
    isOpen,
    defaultValue,
    controlledInputValue,
    onInputChange
  );

  const { handleCancel, handleConfirm, handleBackdropClick } = useDialogHandlers(
    type,
    onClose,
    onConfirm,
    onCancel
  );

  // Focus input for prompt dialogs
  useEffect(() => {
    if (isOpen && type === 'prompt' && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, type]);

  const typeConfig = getDialogTypeConfig(type);
  const labels = getDialogLabels(type, confirmLabel, cancelLabel, title);

  // Icon component mapping
  const IconComponent = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
    info: Info,
    alert: AlertCircle,
    confirm: AlertCircle,
    prompt: AlertCircle,
  }[type];

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={() => handleBackdropClick(closeOnBackdropClick)}>
        <View style={styles.container}>
          <Pressable style={styles.dialog} onPress={(e) => e.stopPropagation()}>
            {/* Header */}
            <View style={styles.header}>
              <View style={[styles.iconContainer, { backgroundColor: typeConfig.iconBg }]}>
                <IconComponent size={24} color={typeConfig.iconColor} />
              </View>

              <View style={styles.headerText}>
                {labels.title && <Text style={styles.title}>{labels.title}</Text>}
                <Text style={styles.message}>{message}</Text>
              </View>
            </View>

            {/* Prompt Input */}
            {type === 'prompt' && (
              <View style={styles.inputContainer}>
                <TextInput
                  ref={inputRef}
                  value={inputValue}
                  onChangeText={setInputValue}
                  placeholder={placeholder}
                  style={styles.input}
                  onSubmitEditing={handleConfirm}
                  returnKeyType="done"
                  autoFocus
                />
              </View>
            )}

            {/* Footer */}
            <View style={styles.footer}>
              {(type === 'confirm' || type === 'prompt') && (
                <Button variant="outline" onPress={handleCancel} className="mr-2 flex-1">
                  {labels.cancel}
                </Button>
              )}
              <Button
                variant={type === 'error' ? 'danger' : 'primary'}
                onPress={handleConfirm}
                className="flex-1"
              >
                {labels.confirm}
              </Button>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  dialog: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    padding: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    color: '#525252',
    lineHeight: 22,
  },
  inputContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#ffffff',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    padding: 16,
  },
});

// Export input value getter for compatibility
export const getDialogInputValue = (): string => {
  return '';
};

// Alias non-legacy per API cross-platform
export { Dialog as SimpleDialog };
