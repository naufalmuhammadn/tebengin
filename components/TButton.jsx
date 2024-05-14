import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { tw } from 'nativewind';
import PropTypes from 'prop-types';

const TButton = ({ title, variant = 'solid', onPress }) => {
  const baseStyle = 'px-4 py-2 rounded';
  
  const variantStyles = {
    solid: `bg-primary`,
    outline: `border-2 border-primary`,
    red: `bg-red-500`,
    text: `text-primary`,
  };
  
  const textColor = variant === 'solid' || 'red' ? 'text-white' : `text-primary-500`;

  return (
    <TouchableOpacity
      className={`${baseStyle} ${variantStyles[variant]}`}
      onPress={onPress}
    >
      <Text className={`${textColor} text-center`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

TButton.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['solid', 'outline', 'red', 'text']),
  onPress: PropTypes.func.isRequired,
};

export default TButton;
