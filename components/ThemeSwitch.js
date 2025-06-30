import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const animation = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  const switchTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 24],
  });

  const backgroundColor = isDark ? '#444' : '#ccc';

  return (
    <TouchableOpacity onPress={toggleTheme} activeOpacity={0.8}>
      <View style={[styles.switchContainer, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: switchTranslate }],
              backgroundColor: isDark ? '#111' : '#fff',
            },
          ]}
        >
          {isDark ? (
            <Feather name="moon" size={16} color="#fff" />
          ) : (
            <Feather name="sun" size={16} color="#f5a623" />
          )}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: 50,
    height: 28,
    borderRadius: 20,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
