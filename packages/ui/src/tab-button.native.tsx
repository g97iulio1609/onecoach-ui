/**
 * TabButton Component - React Native
 *
 * Cross-platform tab button component
 * Mobile-optimized, accessible
 */

import { View } from 'react-native';
import { Text } from './typography.native';
import { Button } from './button.native';
import type { LucideIcon } from 'lucide-react-native';
import type { TabButtonSharedProps } from './tab-button.shared';

export interface TabButtonProps extends TabButtonSharedProps {
  icon: LucideIcon;
}

export const TabButton = ({ active, onClick, icon: Icon, label, count }: TabButtonProps) => {
  return (
    <Button
      variant={active ? 'primary' : 'ghost'}
      size="md"
      onPress={onClick}
      className={`flex-row items-center justify-start rounded-2xl px-4 py-3 min-h-[44px] ${active ? 'shadow-sm elevation-3 bg-primary-600' : 'bg-white dark:bg-neutral-800 elevation-2 shadow-xs'
        }`}
    >
      <Icon size={20} color={active ? '#ffffff' : '#374151'} />
      <Text
        variant={active ? 'inverse' : 'secondary'}
        weight="semibold"
        className="ml-2 text-base"
      >
        {label}
      </Text>
      {count !== undefined && (
        <View
          className={`ml-1 rounded-full px-2 py-0.5 min-w-[24px] items-center justify-center ${active ? 'bg-white/20' : 'bg-emerald-100 dark:bg-emerald-900/30'
            }`}
        >
          <Text
            size="xs"
            weight="bold"
            className={active ? 'text-white' : 'text-emerald-700 dark:text-emerald-300'}
          >
            {count}
          </Text>
        </View>
      )}
    </Button>
  );
};
