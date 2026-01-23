"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
    Group, Container, Box, Anchor, Flex, Image, ActionIcon, Button, 
    rem, Burger, Drawer, Stack, ScrollArea, Loader, Menu, Avatar, Text, 
    UnstyledButton 
} from '@mantine/core';
import { 
    IconBrandWhatsapp, IconPhoneCall, IconUser, IconLogout, IconChevronDown, 
    IconBrandYoutube // 1. Import the YouTube icon
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '@/hooks/getuser';

export function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const [scrolled, setScrolled] = useState(false);
    const { user, loading: loadingUser } = useUser();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/auth/signin";
    };

    const homePageLinks = [
        { label: 'Course Features', href: '#features' },
        { label: 'Mentors', href: '#mentors' },
        { label: 'Achievers', href: '#achievers' },
        { label: 'FAQs', href: '#faqs' }
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target) {
            const headerOffset = 74; 
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    return (
        <Box
            component="header"
            style={{
                position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)',
                background: scrolled
                    ? 'linear-gradient(90deg, rgba(6,21,55,0.95) 0%, rgba(11,44,100,0.95) 60%, rgba(17,76,168,0.95) 100%)'
                    : 'linear-gradient(90deg, rgba(4,16,36,0.95) 0%, rgba(6,34,74,0.95) 55%, rgba(10,60,126,0.95) 100%)',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.10)',
                boxShadow: scrolled ? '0 4px 18px -4px rgba(0,0,0,0.45)' : '0 2px 10px -4px rgba(0,0,0,0.35)',
                transition: 'background 300ms ease, border-color 300ms ease, box-shadow 300ms ease'
            }}
            py="xs" px="md"
        >
            <Container size="lg">
                <Flex align="center" justify="space-between" h={rem(64)} style={{ gap: rem(12) }}>
                    <Group gap="sm" align="center">
                        <Group hiddenFrom="md" style={{ width: rem(40), justifyContent: 'flex-start' }}>
                            <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" color="white" />
                        </Group>
                        <Anchor href="/" underline="never" style={{ display: 'flex', alignItems: 'center', gap: rem(8), lineHeight: 1 }}>
                            <Image src="/company.webp" alt="Company Logo" height={40} width={40} fit="contain" radius="md" />
                            <span style={{ fontWeight: 800, fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.5px', fontSize: rem(20), color: '#fff', whiteSpace: 'nowrap' }}>
                                Crack Code CAT
                            </span>
                        </Anchor>
                    </Group>
                    
                    {isHomePage && (
                        <Group gap="md" visibleFrom="md">
                            {homePageLinks.map((link) => (
                                <Anchor
                                    key={link.href}
                                    href={link.href}
                                    underline="never"
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    style={{ color: 'rgba(255,255,255,0.95)', padding: '8px 14px', borderRadius: 14, fontSize: rem(15), fontWeight: 600, transition: 'background 220ms ease' }}
                                >
                                    {link.label}
                                </Anchor>
                            ))}
                        </Group>
                    )}

                    <Group>
                        <Group gap="xs" visibleFrom="md">
                            <ActionIcon component="a" href="https://wa.me/8744003503" target="_blank" rel="noopener noreferrer" color="green" variant="light" size="lg">
                                <IconBrandWhatsapp size={24} />
                            </ActionIcon>
                            <ActionIcon component="a" href="tel:+918744003503" color="blue" variant="light" size="lg">
                                <IconPhoneCall size={24} />
                            </ActionIcon>
                            {/* 2. Add the YouTube icon for the desktop view */}
                            <ActionIcon component="a" href="https://www.youtube.com/@CrackCodeCAT" target="_blank" rel="noopener noreferrer" color="red" variant="light" size="lg">
                                <IconBrandYoutube size={24} />
                            </ActionIcon>
                        </Group>
                        <Flex align="center" gap="sm">
                            {loadingUser ? <Loader size="sm" color="yellow" /> : user ? (
                                <Menu shadow="md" width={180} position="bottom-end" withArrow>
                                    <Menu.Target>
                                        <UnstyledButton style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.2)', cursor: 'pointer' }}>
                                            <Avatar color="yellow" radius="xl" size={28}>{(user.name && user.name[0]?.toUpperCase()) || <IconUser size={18} />}</Avatar>
                                            <Text fw={600} size="sm" c="white" style={{ whiteSpace: 'nowrap' }}>{user.name}</Text>
                                            <IconChevronDown size={16} color="#fff" />
                                        </UnstyledButton>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item leftSection={<IconUser size={16} />} component="a" href="/profile">Profile</Menu.Item>
                                        <Menu.Item leftSection={<IconLogout size={16} />} color="red" onClick={handleLogout}>Logout</Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            ) : (
                                <Group visibleFrom="md">
                                    <Button component="a" href="/auth/signin" variant="subtle" color="gray" styles={{ root: { color: '#fff', fontWeight: 600 } }}>Sign In</Button>
                                    <Button component="a" href="/auth/signup" variant="gradient" gradient={{ from: '#FFC700', to: '#FFDE55' }} styles={{ root: { fontWeight: 700, color: '#0B2C64', boxShadow: '0 4px 14px -2px rgba(255,199,0,0.45)' } }}>Get Started</Button>
                                </Group>
                            )}
                        </Flex>
                    </Group>
                </Flex>
            </Container>

            <Drawer opened={drawerOpened} onClose={closeDrawer} padding="md" size={280} position="left" withCloseButton>
                <ScrollArea style={{ height: 'calc(100vh - 60px)' }}>
                    <Stack gap="sm" pt="md">
                        {isHomePage && (
                            homePageLinks.map(link => (
                                <Anchor key={link.href} href={link.href} underline="never"
                                    onClick={(e) => { closeDrawer(); handleNavClick(e, link.href); }}
                                    style={{ fontSize: rem(16), fontWeight: 700, padding: '8px 4px' }}
                                >
                                    {link.label}
                                </Anchor>
                            ))
                        )}
                         <Stack gap={6} mt="md">
                              <Group gap={8}>
                                  <ActionIcon component="a" href="https://wa.me/8744003503" target="_blank" rel="noopener noreferrer" color="green" variant="light"><IconBrandWhatsapp size={20} /></ActionIcon>
                                  <ActionIcon component="a" href="tel:8744003503" color="blue" variant="light"><IconPhoneCall size={20} /></ActionIcon>
                                  {/* 3. Add the YouTube icon for the mobile drawer view */}
                                  <ActionIcon component="a" href="https://youtube.com/@yourchannel" target="_blank" rel="noopener noreferrer" color="red" variant="light"><IconBrandYoutube size={20} /></ActionIcon>
                              </Group>
                                {loadingUser ? null : !user && (
                                    <Stack mt="md">
                                        <Button component="a" href="/auth/signin" variant="subtle" color="gray" fullWidth>Sign In</Button>
                                        <Button component="a" href="/auth/signup" variant="gradient" gradient={{ from: '#FFC700', to: '#FFDE55' }} fullWidth>Get Started</Button>
                                    </Stack>
                                )}
                         </Stack>
                    </Stack>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}