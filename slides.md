---
colorSchema: light
color: orange-light
layout: cover
theme: neversink
routerMode: hash
lineNumbers: true
fonts: false
neversink_string: "CLHCP2026 · Wuhan"
title: The Upgrade of the China Grid Certification Authority
titleTemplate: '%s - Xiao Han'
favicon: /ihep_dci.svg
transition: fade
---

### The Upgrade of the China Grid Certification Authority

#### <mdi-certificate /> OpenXPKI · Automated Certificate Lifecycle · Trust for Chinese HEP Computing

<br>

##### **Xiao Han · on behalf of Grid Group, IHEP Computing Center** <a href="mailto:hanx@ihep.ac.cn"></a><Email v="hanx@ihep.ac.cn" />

<br>

##### October 28 – November 1, 2026 · Wuhan

<br>

<a href="https://indico.ihep.ac.cn/event/29795/" class="ns-c-iconlink"><mdi-open-in-new />The 12th China LHC Physics Conference (CLHCP2026)</a>, <a href="https://gridca.ihep.ac.cn/webui/ihepca/" class="ns-c-iconlink"><mdi-open-in-new />gridca.ihep.ac.cn</a>

<img src="/ihepcc.png" style="position:absolute;top:5px;right:5px;width:250px;opacity:1;z-index:1;" />

---
layout: side-title
title: Table of Contents
color: rose-light
align: cm-lm
---

:: title ::

# Outline

:: content ::

- **Grid PKI and Its Role**
    - *What a CA does · who relies on it*
- **The Old System and Its Limits**
- **The New CA on OpenXPKI**
    - *Architecture · user experience · automation*
- **Trust and Migration**
- **Summary**

---
layout: section
color: cyan-light
---

# 1 · Grid PKI and Its Role

---
layout: top-title
color: gray-light
---

:: title ::

# Certificates are identities for distributed computing

:: content ::

<AdmonitionType type='info'>
<mdi-certificate /> A <b>C</b>ertificate <b>A</b>uthority is the trusted entity that issues and manages X.509 digital certificates — the machine-readable identities of a distributed computing infrastructure.
</AdmonitionType>

**How grid access works:**

```text
User ── certificate (issued by IHEP CA, ~1 year)
     ── VOMS proxy (short-lived credential, hours)
     ── grid jobs, storage, services
```

**The relying side:**

- Sites and services verify the certificate chain → **the CA vouches for the identity**
- VOMS maps the certificate to experiment roles (e.g. `/atlas`, `/belle`)
- Lost trust in the CA ⇒ the whole authentication chain fails

---
layout: top-title
color: gray-light
---

:: title ::

# Who relies on the IHEP CA

:: content ::

<div class="who-grid mt-4">
  <div><strong><mdi-atom /> LHC experiments</strong><span> Chinese ATLAS, CMS and LHCb groups: user certificates, robot certificates, host certificates for sites and services in the WLCG framework.</span></div>
  <div><strong><mdi-flask /> Domestic experiments</strong><span> JUNO, Belle II, LHAASO and others: grid computing identity for production, analysis and data transfer.</span></div>
  <div><strong><mdi-earth /> International trust</strong><span> As part of the IGTF / APGridPMA trust framework, IHEP-issued identities are recognized by WLCG sites worldwide.</span></div>
</div>

<div class="mt-5">
<AdmonitionType type='important'>
The IHEP CA is <b>shared national infrastructure</b>: one trust anchor behind the distributed computing of essentially every HEP collaboration in China — including future experiments such as CEPC.
</AdmonitionType>
</div>

---
layout: section
color: red-light
---

# 2 · The Old System and Its Limits

---
layout: top-title-two-cols
color: gray-light
---

:: title ::

# An aged OpenCA deployment

:: left ::

<div style="text-align: center; max-width: 100%; margin: 0 auto;">
  <img src="/cagrid_screenshot.png" style="width: 100%; border-radius: 12px; border: 1px solid #e5e7eb;" />
  <div style="font-size:0.8em;color:#888;margin-top:4px;"><mdi-web /> cagrid.ihep.ac.cn — the old CA web interface</div>
</div>

:: right ::

| Issue | Impact |
|---|---|
| Root key **1024-bit** | Below modern security requirements |
| Framework **OpenCA** | Community abandoned for years |
| **Offline** issuance | Admin physically enters an isolated room |
| **Manual** CRL | Delayed publication after revocation |

<AdmonitionType type='warning'>
Growing user base + rising automation needs: the old system could not scale <b>securely</b> or <b>efficiently</b>.
</AdmonitionType>

---
layout: section
color: purple-light
---

# 3 · The New CA on OpenXPKI

---
layout: top-title
color: gray-light
---

:: title ::

# Complete online capabilities, for users and RA

:: content ::

Built on <b>OpenXPKI</b> — enterprise-grade open-source PKI: workflow-driven lifecycle, EST / SCEP / ACME enrollment, HSM-ready crypto layer.

<div class="check-grid mt-2">
  <div><mdi-account-key /><div><strong>Online request, automatic issuance</strong><span> IHEP-account login, online request for user / robot / host certificates; server-side RSA 4096 keys, automatic issuance after RA approval.</span></div></div>
  <div><mdi-robot-industrial /><div><strong>Smooth legacy migration</strong><span> IHEP-2013 personal certificates migrate in one step, identity locked server-side; legacy hosts migrate via EST — no manual work.</span></div></div>
  <div><mdi-autorenew /><div><strong>EST auto-renewal for hosts</strong><span> Host-side scripts renew within 45 days of expiry and hot-reload services — a zero-ops lifecycle.</span></div></div>
  <div><mdi-file-remove-outline /><div><strong>Online revocation, automatic CRL</strong><span> Single or batch revocation online; CRLs issued on schedule and published to public URLs, per the CP/CPS.</span></div></div>
  <div><mdi-bell-ring-outline /><div><strong>Lifecycle e-mail notifications</strong><span> Pending, issued, rejected and expiring-soon events notify applicants and the RA automatically.</span></div></div>
  <div><mdi-shield-account /><div><strong>RA online workbench</strong><span> Approval queue, certificate search, workflow tracking, batch approval — all logged and auditable.</span></div></div>
</div>

---
layout: top-title
color: gray-light
---

:: title ::

# Architecture

:: content ::

<div style="text-align: center; max-width: 88%; margin: 0 auto;">

```mermaid {scale: 0.64}
graph LR
    User[User] -->|HTTPS| WebUI[WebUI]
    User -->|EST/API| API[Automation Interface]
    WebUI --> Client[OpenXPKI Client]
    API --> Client
    Client --> Server[OpenXPKI Server]
    Server --> DB[(MariaDB)]
    Server --> LDAP[LDAP Auth]
    Server --> Mail[Email Notification]
    Server --> Download[download]
    Download --> RP[Relying Party]
```

</div>

<div class="text-center mt-2">
<b>Layers:</b> user → access (WebUI / EST / API) → business logic (workflow, RA) → data → publishing (certificates, CRL)
</div>

---
layout: top-title-two-cols
color: gray-light
---

:: title ::

# What changed for the user

:: left ::

| Dimension | Old (OpenCA) | New (OpenXPKI) |
|---|---|---|
| URL | cagrid.ihep.ac.cn | **gridca.ihep.ac.cn** |
| Login | Basic web form | **IHEP SSO** |
| Approval | Offline e-mail | **Online RA workflow** |
| Key generation | Browser-dependent | **Server-side, RSA 4096** |
| Automation | None | **EST · API** |
| CRL | Manual | **Automatic** |

:: right ::

**Request → issue, fully online:**

```mermaid {scale: 0.54}
sequenceDiagram
    User->>WebUI: SSO login, request
    WebUI->>OpenXPKI: workflow + RA review
    RA->>OpenXPKI: online approval
    OpenXPKI-->>User: issue + e-mail notice
    User->>WebUI: download PKCS#12
```

<AdmonitionType type='note'>
From "days, with human relay" to "same-day, self-service".
</AdmonitionType>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# The new WebUI: gridca.ihep.ac.cn

:: left ::

<AdmonitionType type='info'>
<mdi-web /> A public landing page explains the service, trust and history — before asking for any credentials.
</AdmonitionType>

**Four authentication entries:**

- **IHEP Account (SSO)** — recommended for all users
- **Client certificate** — returning certificate holders
- **Client certificate (RA)** — RA operators
- **IHEP-2013 certificate migration** — one-time identity carry-over

**Also public:** CA certificates, CRLs and policy documents for relying parties.

:: right ::

<div style="text-align: center;">
  <img src="/gridca_webui.png" style="width: 100%; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 6px 18px rgba(15,23,42,0.12);" />
  <div style="font-size:0.8em;color:#888;margin-top:6px;"><mdi-web /> gridca.ihep.ac.cn — the new CA web interface</div>
</div>

---
layout: top-title
color: gray-light
---

:: title ::

# Auditable and monitored end to end

:: content ::

<div class="check-grid mt-3">
  <div><mdi-database-search /><div><strong>Full audit trail</strong><span> Every WebUI, RA and EST access and operation is recorded in the database — searchable by person, time and action.</span></div></div>
  <div><mdi-monitor-dashboard /><div><strong>Centralized logs and dashboards</strong><span> Component logs persist to Elasticsearch; Grafana status, audit and security panels are already in production.</span></div></div>
  <div><mdi-two-factor-authentication /><div><strong>Hardened operations</strong><span> Server logins require an independent second factor; every login notifies the administrators by e-mail.</span></div></div>
  <div><mdi-database-sync-outline /><div><strong>Backup and recovery</strong><span> MariaDB dual replicas with scheduled backups of certificate and workflow data — meeting audit and recovery requirements.</span></div></div>
</div>

<div class="mt-5">
<AdmonitionType type='info'>
Every issuance notifies both the RA and the applicant — anomalous issuance becomes visible immediately, strengthening the trust story behind the accreditation.
</AdmonitionType>
</div>

---
layout: section
color: orange-light
---

# 4 · Trust and Migration

---
layout: top-title
color: gray-light
---

:: title ::

# Timeline: from prototype to IGTF accreditation

:: content ::

<div style="text-align: center; max-width: 96%; margin: 0.3rem auto;">

```mermaid {scale: 0.55}
timeline
    Late 2025 : Core functionality complete
    2026-02 : First contact with APGridPMA chair
    2026-03 : ISGC — formal application submitted
    2026-04~07 : Review period, sustained follow-up
    2026-08 : IGTF 1.145 admits the IHEP-2026 hierarchy
    End of 2026 : IHEP-2013 old root expires
```

</div>

<div class="mt-4">
<AdmonitionType type='warning'>
<b>The end-2026 expiry of the IHEP-2013 root is the hard deadline for this transition.</b> The new CA is accredited and in production; a unified migration notice gives every user a sufficient window to switch.
</AdmonitionType>
</div>

---
layout: top-title
color: gray-light
---

:: title ::

# Summary

:: content ::

- **Modern platform** — OpenCA → OpenXPKI: a maintained, workflow-driven, enterprise-grade PKI
- **Stronger security** — 1024-bit root retired; RSA 4096 server-side key generation; automated CRL
- **Better service** — SSO login, online RA approval, same-day issuance, e-mail notifications
- **Automation** — EST renewal for hosts, legacy migration, API access for bulk integration
- **Trust established** — admitted into IGTF 1.145 (Aug 2026); old CA retires at the end of 2026
- **Shared foundation** — one trust anchor for LHC, JUNO, Belle II, LHAASO… and CEPC

<AdmonitionType type='note'>
<mdi-certificate /> Documentation and user guides are published with the CA; user training is provided at collaboration workshops and winter schools.
</AdmonitionType>

---
layout: cover
color: navy
title: Questions
---


### Thank you. Questions?

**Xiao Han · IHEP, CC**<br/>
Grid Group · PKI Team

<a href="https://gridca.ihep.ac.cn/webui/ihepca/" class="ns-c-iconlink"><mdi-open-in-new /> gridca.ihep.ac.cn</a>
 · <a href="https://indico.ihep.ac.cn/event/29795/" class="ns-c-iconlink"><mdi-calendar /> CLHCP2026</a>

<br/>

##### Acknowledgements: IGTF · APGridPMA · EUGridPMA — and the IHEP PKI team: Gongxing Sun (RA), Tian Yan, Xiao Han
