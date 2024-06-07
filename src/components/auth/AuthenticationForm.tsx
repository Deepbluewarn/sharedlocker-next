import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core';
import { useFormState } from 'react-dom';
import signIn from '@/actions/auth/signIn';
import signUp from '@/actions/auth/signUp';
import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

export function AuthenticationForm(props: PaperProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const [signInState, signInFormAction] = useFormState(signIn, null)
    const [signUpState, signUpFormAction] = useFormState(signUp, null)
    
    const [type, toggle] = useToggle(['로그인', '회원가입']);
    const form = useForm({
        initialValues: {
            id: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            // password: (val) => (val.length <= 6 ? '비밀번호는 최소 6자리 이상입니다.' : null),
        },
    });

    const router = useRouter();

    useEffect(() => {
        if (signInState) {
            notifications.show({
                title: '로그인',
                message: signInState.message,
            })
            if (signInState.success) {
                router.push('/')
            }
        }
    }, [signInState])

    useEffect(() => {
        if (signUpState) {
            notifications.show({
                title: '회원가입',
                message: signUpState.message,
            })
            if (signUpState.success) {
                router.push('/')
            }
        }
    }, [signUpState])
    
    const action = useCallback(() => {
        if (!formRef.current) return;

        console.log('AuthenticationForm formRef: ', formRef.current)
        const formData = new FormData(formRef.current)

        console.log('AuthenticationForm formData: ', formData)

        let formObject = Object.fromEntries(formData.entries());
        console.log(formObject);

        if (type === '로그인') {
            signInFormAction(formData)
        } else {
            signUpFormAction(formData)
        }
    }, [type])

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
                {type}
            </Text>

            <Divider label="" labelPosition="center" my="lg" />

            <form onSubmit={form.onSubmit(() => {action()})} ref={formRef}>
                <Stack>
                    {type === '회원가입' && (
                        <TextInput
                            label="이름"
                            name='name'
                            placeholder="이름을 입력하세요"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="아이디"
                        name='id'
                        placeholder="아이디를 입력하세요"
                        value={form.values.id}
                        onChange={(event) => form.setFieldValue('id', event.currentTarget.value)}
                        error={form.errors.id && '유효하지 않은 아이디입니다.'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="비밀번호"
                        name='password'
                        placeholder="비밀번호를 입력하세요"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        // error={form.errors.password && '비밀번호는 최소 6자리 이상입니다.'}
                        radius="md"
                    />

                    {type === '회원가입' && (
                        <Checkbox
                            label="약관에 동의합니다."
                            name='terms'
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === '회원가입'
                            ? '계정이 있으신가요? 로그인'
                            : "계정이 없으신가요? 회원가입"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}