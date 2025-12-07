/**
 * Modal Component - React Native
 *
 * Cross-platform modal using React Native Modal
 * Mobile-optimized, accessible
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  BackHandler,
} from 'react-native';
import { X } from 'lucide-react-native';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdropClick?: boolean;
  showCloseButton?: boolean;
  mobileFullScreen?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdropClick = true,
  showCloseButton = true,
  mobileFullScreen = false,
}: ModalProps) => {
  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isOpen) {
        onClose();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isOpen, onClose]);

  const handleBackdropPress = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        <View style={[styles.container, mobileFullScreen && styles.fullScreen]}>
          <Pressable
            style={[styles.modal, mobileFullScreen && styles.modalFullScreen]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <View style={styles.header}>
                {title && <Text style={styles.title}>{title}</Text>}
                {showCloseButton && (
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                    accessibilityLabel="Close modal"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <X size={20} color="#737373" />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Body - Scrollable */}
            <ScrollView
              style={styles.body}
              contentContainerStyle={styles.bodyContent}
              showsVerticalScrollIndicator={true}
              bounces={false}
            >
              {children}
            </ScrollView>
          </Pressable>
        </View>
      </Pressable>
    </RNModal>
  );
};

// Modal Footer Component
export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return <View style={styles.footer}>{children}</View>;
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  fullScreen: {
    padding: 0,
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '90%',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalFullScreen: {
    borderRadius: 0,
    maxHeight: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
    flex: 1,
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
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
