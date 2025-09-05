'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDaily, useDevices } from '@daily-co/daily-react';

export const useStartHaircheck = (): {
	isPermissionsPrompt: boolean;
	isPermissionsLoading: boolean;
	isPermissionsGranted: boolean;
	isPermissionsDenied: boolean;
	requestPermissions: () => void;
} => {
	const daily = useDaily();
	const { micState, camState } = useDevices();

	const [permissionState, setPermissionState] = useState<PermissionState | null>(null);

	useEffect(() => {
		try {
			const perms = (navigator as any).permissions;
			if (perms && typeof perms.query === 'function') {
				perms
					.query({ name: 'microphone' as PermissionName })
					.then((permissionStatus: PermissionStatus) => {
						setPermissionState(permissionStatus.state);
						permissionStatus.onchange = () => {
							setPermissionState(permissionStatus.state);
						};
					})
					.catch(() => {
						setPermissionState(null);
					});
			} else {
				setPermissionState(null);
			}
		} catch {
			setPermissionState(null);
		}
	}, []);

	const requestPermissions = useCallback(() => {
		if (!daily) return;
		daily.startCamera({
			startVideoOff: false,
			startAudioOff: false,
			audioSource: 'default',
			inputSettings: {
				audio: {
					processor: {
						type: 'noise-cancellation',
					},
				},
			},
		});
	}, [daily]);

	const isPermissionsPrompt = useMemo(() => {
		return permissionState === 'prompt' && camState !== 'granted' && micState !== 'granted';
	}, [permissionState, camState, micState]);

	const isPermissionsLoading = useMemo(() => {
		return (permissionState === null || permissionState === 'granted') && (micState === 'idle' || camState === 'idle');
	}, [permissionState, micState, camState]);

	const isPermissionsGranted = useMemo(() => {
		return permissionState === 'granted' || micState === 'granted' || camState === 'granted';
	}, [permissionState, micState, camState]);

	const isPermissionsDenied = useMemo(() => {
		return permissionState === 'denied' || micState === 'blocked' || camState === 'blocked';
	}, [permissionState, micState, camState]);

	return {
		isPermissionsPrompt,
		isPermissionsLoading,
		isPermissionsGranted,
		isPermissionsDenied,
		requestPermissions,
	};
};
