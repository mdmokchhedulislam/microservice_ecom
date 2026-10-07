{{/*
Chart name
*/}}

{{- define "iips.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}


{{/*
Full application name
*/}}

{{- define "iips.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name (include "iips.name" .) | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}


{{/*
Common labels
*/}}

{{- define "iips.labels" -}}

helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}

{{ include "iips.selectorLabels" . }}

app.kubernetes.io/managed-by: {{ .Release.Service }}

{{- end }}


{{/*
Selector labels
*/}}

{{- define "iips.selectorLabels" -}}

app.kubernetes.io/name: {{ include "iips.name" . }}

app.kubernetes.io/instance: {{ .Release.Name }}

{{- end }}