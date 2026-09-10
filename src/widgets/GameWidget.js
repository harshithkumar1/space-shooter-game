import { Text, VStack, HStack } from '@expo/ui/swift-ui';
import { font, foregroundStyle, padding } from '@expo/ui/swift-ui/modifiers';
import { createLiveActivity } from 'expo-widgets';

const GameActivity = (props, environment) => {
  'widget';

  const accentColor = '#FFFFFF';

  return {
    banner: (
      <VStack modifiers={[padding({ all: 10 })]}>
        <Text modifiers={[font({ weight: 'bold', size: 16 }), foregroundStyle(accentColor)]}>
          SPACE SHOOTER
        </Text>
        <Text modifiers={[font({ size: 24 }), foregroundStyle(accentColor)]}>
          Score: {props.score}
        </Text>
      </VStack>
    ),
    compactLeading: (
      <Text modifiers={[font({ weight: 'bold' }), foregroundStyle(accentColor)]}>
        {props.score}
      </Text>
    ),
    compactTrailing: (
      <Text modifiers={[foregroundStyle(accentColor)]}>
        Lives: {props.lives}
      </Text>
    ),
    minimal: (
      <Text modifiers={[font({ weight: 'bold' }), foregroundStyle(accentColor)]}>
        {props.score}
      </Text>
    ),
    expandedLeading: (
      <VStack modifiers={[padding({ all: 12 })]}>
        <Text modifiers={[font({ weight: 'bold', size: 20 }), foregroundStyle(accentColor)]}>
          SPACE SHOOTER
        </Text>
      </VStack>
    ),
    expandedCenter: (
      <VStack modifiers={[padding({ all: 12 })]}>
        <Text modifiers={[font({ size: 32 }), foregroundStyle(accentColor)]}>
          Score: {props.score}
        </Text>
      </VStack>
    ),
    expandedTrailing: (
      <VStack modifiers={[padding({ all: 12 })]}>
        <Text modifiers={[font({ size: 16 }), foregroundStyle(accentColor)]}>
          Lives: {props.lives}
        </Text>
        <Text modifiers={[font({ size: 16 }), foregroundStyle(accentColor)]}>
          High: {props.highScore}
        </Text>
      </VStack>
    ),
    expandedBottom: (
      <HStack modifiers={[padding({ all: 12 })]}>
        <Text modifiers={[foregroundStyle(accentColor)]}>
          {props.isPlaying ? 'Playing...' : 'Tap to start'}
        </Text>
      </HStack>
    ),
  };
};

export default createLiveActivity('GameActivity', GameActivity);
