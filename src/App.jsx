import React from 'react';
import Layout from './components/Layout';
import ContextHeader from './components/ContextHeader';
import Button from './components/Button';
import Input from './components/Input';
import Card from './components/Card';

function App() {
    return (
        <Layout>
            <ContextHeader
                title="Design System Demo"
                description="This is a demonstration of the KodNest Premium Build System. It follows the principles of calm, intentional, and coherent design."
            />

            <div style={{
                display: 'grid',
                gridTemplateColumns: '7fr 3fr',
                gap: 'var(--space-4)',
                alignItems: 'start'
            }}>
                {/* Primary Workspace (70%) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <Card title="Primary Workspace" action={<Button variant="secondary" style={{ fontSize: '16px', padding: 'var(--space-1) var(--space-2)' }}>Refresh</Button>}>
                        <p style={{ marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)', maxWidth: '720px' }}>
                            This area is for the main product interaction. It features clean cards and predictable components.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                            <Input label="Project Name" placeholder="e.g. My Awesome App" />
                            <Input label="Target Audience" placeholder="e.g. Students" />
                        </div>
                    </Card>

                    <Card title="Component Showcase">
                        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Button variant="primary">Primary Action</Button>
                            <Button variant="secondary">Secondary Action</Button>
                            <Button variant="outline">Outline Action</Button>
                        </div>
                    </Card>
                </div>

                {/* Secondary Panel (30%) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <Card title="Instructions" noPadding>
                        <div style={{ padding: 'var(--space-3)', backgroundColor: '#FAFAFA' }}>
                            <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: '1.5', maxWidth: '720px' }}>
                                This panel provides context and helper tools. It stays calm and distinct from the main workspace.
                            </p>
                        </div>
                        <div style={{ padding: 'var(--space-3)', borderTop: '1px solid var(--color-border)' }}>
                            <div style={{
                                backgroundColor: '#F1F1F1',
                                padding: 'var(--space-2)',
                                borderRadius: 'var(--space-1)',
                                marginBottom: 'var(--space-2)',
                                fontFamily: 'monospace',
                                fontSize: '16px'
                            }}>
                                git commit -m "Initial design system"
                            </div>
                            <Button variant="secondary" style={{ width: '100%' }}>Copy Command</Button>
                        </div>
                    </Card>

                    <Card>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: 'var(--space-1)' }}>Feedback</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                            <Button variant="secondary" style={{ justifyContent: 'flex-start' }}>It Worked</Button>
                            <Button variant="secondary" style={{ justifyContent: 'flex-start', color: 'var(--color-accent)', borderColor: 'rgba(139, 0, 0, 0.2)' }}>Report Issue</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}

export default App;
