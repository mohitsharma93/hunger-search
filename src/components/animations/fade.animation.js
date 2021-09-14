import React, { useRef } from 'react';
import { Animated } from 'react-native';

export const FadeInView = ({ duration = 1500, ...props}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: duration,
        useNativeDriver: true // we send everything about the animation to native before starting the animation so
                              // ui thread start animation instead of passing through bridge every frame.
      }
    ).start();
  }, [fadeAnim, duration])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  )
}