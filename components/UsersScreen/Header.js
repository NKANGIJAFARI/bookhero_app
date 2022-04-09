const header = () => {
  return (
    <View style={styles.headerStyle}>
      <Ionicons
        name='notifications'
        size={24}
        color='black'
        onPress={() => navigation.navigate('Notification')}
      />
    </View>
  );
};
