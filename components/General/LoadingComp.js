import React from 'react';
import { StyleSheet } from 'react-native';
import { Plane, Grid, Wave, CircleFade } from 'react-native-animated-spinkit';
import { View } from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Loader,
  Shine,
  ShineOverlay,
} from 'rn-placeholder';
import { Colors } from '../../constant/styles';

const LoadingComp = ({ type }) => {
  return (
    <>
      {type === 'placeholder' ? (
        <View style={{ margin: 16 }}>
          <Placeholder
            Left={PlaceholderMedia}
            Right={PlaceholderMedia}
            Animation={ShineOverlay}>
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            zIndex: 1,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.45)',
          }}>
          <Wave size={100} color={Colors.primary} />
        </View>
      )}
    </>
  );
};

export default LoadingComp;
