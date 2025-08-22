import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// AI Nexus specific colors
				neural: {
					pink: 'hsl(var(--neural-pink))',
					blue: 'hsl(var(--data-blue))',
					amber: 'hsl(var(--code-amber))',
					purple: 'hsl(var(--energy-purple))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-neural': 'var(--gradient-neural)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-glow': 'var(--gradient-glow)'
			},
			boxShadow: {
				'neural-glow': 'var(--pulse-glow)',
				'glass': '0 4px 32px hsla(180, 100%, 50%, 0.15), inset 0 1px 0 hsla(0, 0%, 100%, 0.1)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				// AI Nexus animations
				'liquid-flow': {
					'0%, 100%': { 
						'background-position': '0% 50%' 
					},
					'50%': { 
						'background-position': '100% 50%' 
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						'box-shadow': '0 0 20px hsl(180 100% 50% / 0.5)' 
					},
					'50%': { 
						'box-shadow': '0 0 40px hsl(180 100% 50% / 0.8), 0 0 60px hsl(180 100% 50% / 0.4)' 
					}
				},
				'border-flow': {
					'0%': { 
						'background-position': '0% 50%' 
					},
					'100%': { 
						'background-position': '200% 50%' 
					}
				},
				'neural-pulse': {
					'0%, 100%': { 
						transform: 'scale(1)', 
						opacity: '0.8' 
					},
					'50%': { 
						transform: 'scale(1.05)', 
						opacity: '1' 
					}
				},
				'data-stream': {
					'0%': { 
						transform: 'translateX(-100%)' 
					},
					'100%': { 
						transform: 'translateX(100vw)' 
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px)' 
					},
					'50%': { 
						transform: 'translateY(-20px)' 
					}
				},
				'rotate-slow': {
					from: { 
						transform: 'rotate(0deg)' 
					},
					to: { 
						transform: 'rotate(360deg)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'liquid-flow': 'liquid-flow 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
				'border-flow': 'border-flow 3s linear infinite',
				'neural-pulse': 'neural-pulse 2s ease-in-out infinite',
				'data-stream': 'data-stream 8s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;