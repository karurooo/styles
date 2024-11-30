import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from 'react-native';

interface TabBarIconProps {
	name: string;
	color: string;
	size?: number;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, size = 24 }) => {
	return <Ionicons name={name as any} color={color} size={size} />;
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
