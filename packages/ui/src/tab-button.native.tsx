/**
 * TabButton Component - React Native
 *
 * Cross-platform tab button component
 * Mobile-optimized, accessible
 */

import { Pressable, Text, StyleSheet, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import type { TabButtonSharedProps } from './tab-button.shared';

export interface TabButtonProps extends TabButtonSharedProps {
  icon: LucideIcon;
}

export const TabButton = ({ active, onClick, icon: Icon, label, count }: TabButtonProps) => {
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        styles.base,
        active ? styles.active : styles.inactive,
        pressed && styles.pressed,
      ]}
    >
      <Icon size={20} color={active ? '#ffffff' : '#374151'} />
      <Text style={[styles.label, active ? styles.activeLabel : styles.inactiveLabel]}>
        {label}
      </Text>
      {count !== undefined && (
        <View style={[styles.badge, active ? styles.activeBadge : styles.inactiveBadge]}>
          <Text
            style={[styles.badgeText, active ? styles.activeBadgeText : styles.inactiveBadgeText]}
          >
            {count}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    minHeight: 44,
  },
  active: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  inactive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeLabel: {
    color: '#ffffff',
  },
  inactiveLabel: {
    color: '#374151',
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  inactiveBadge: {
    backgroundColor: '#d1fae5',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  activeBadgeText: {
    color: '#ffffff',
  },
  inactiveBadgeText: {
    color: '#065f46',
  },
});
