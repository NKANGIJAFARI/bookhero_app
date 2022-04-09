import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Fonts, Sizes } from '../../constant/styles';
import { TransitionPresets } from 'react-navigation-stack';

const AboutUsScreen = () => {
  return (
    <View style={styles.aboutUsContainerStyle}>
      <Text style={{ ...Fonts.black16Regular, textAlign: 'justify' }}>
        About Us. We Health Express Home Healthcare is the fastest growing Home
        Healthcare company (Mobile Clinic) in the Dubai-UAE having an impressive
        'SKILLS OF THE HEALTHCARE MANAGEMENT', providing superior services to
        its customers through very efficient, well experienced and qualified
        team
      </Text>

      <Text
        style={{
          ...Fonts.black16Regular,
          marginVertical: Sizes.fixPadding + 5.0,
          textAlign: 'justify',
        }}>
        Health Express Home Healthcare is known for its high ethical standards
        synonymous with 'TRUST' and each and every constituent of 'Team HE'
        follows an immaculate value system.
      </Text>

      <Text style={{ ...Fonts.black16Regular, textAlign: 'justify' }}>
        AIM To become the First-Choice for Home Healthcare service provider for
        customers in all the markets that we operate in. Services Provide by
        Health Express below mentioned Services On Call. To collect COVID-19 PCR
        Sample On Call at Home. To provide Doctor On Call at Home. To provide
        Nursing Services On Call at Home. To provide Blood Sample Collection On
        Call at Home. To provide Physiotherapy On Call. To provide Doctor Tele
        Consultation On Call at Home. To provide Medical Tourism Services.
      </Text>
    </View>
  );
};

AboutUsScreen.navigationOptions = {
  title: 'About Us',
  headerTitleStyle: {
    ...Fonts.black20Bold,
    marginLeft: -Sizes.fixPadding * 2.0,
  },
  ...TransitionPresets.SlideFromRightIOS,
};

const styles = StyleSheet.create({
  aboutUsContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 2.0,
  },
});

export default AboutUsScreen;
