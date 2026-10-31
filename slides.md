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
favicon: /ihep_grid_ca_icon_refined.svg
transition: fade
---

<img src="/ihep_grid_ca_icon_refined.svg" alt="IHEP Grid CA" class="ca-cover-icon" />

### The Upgrade of the China Grid Certification Authority

#### <mdi-certificate /> OpenXPKI · Automated Certificate Lifecycle · Trust for Chinese HEP Computing

<br>

##### **Xiao Han · on behalf of Grid Group, IHEP Computing Center** <a href="mailto:hanx@ihep.ac.cn"></a><Email v="hanx@ihep.ac.cn" />

<br>

##### November 1, 2026 · Wuhan

<br>

<a href="https://indico.ihep.ac.cn/event/29795/" class="ns-c-iconlink"><mdi-open-in-new />The 12th China LHC Physics Conference (CLHCP2026)</a>, <a href="https://gridca.ihep.ac.cn/webui/ihepca/" class="ns-c-iconlink"><mdi-open-in-new />gridca.ihep.ac.cn</a>

<img src="/ihepcc.png" style="position:absolute;top:5px;right:5px;width:250px;opacity:1;z-index:1;" />

<!--
Timing: 0:30

Good afternoon. I am Xiao Han from the IHEP Computing Center. Users know our grid certificate service as IHEP CA. Today I will present the upgrade of the PKI infrastructure behind that service, explaining its role in distributed computing, the limits of the old system, and the improvements in the new deployment.
-->

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

# A trust infrastructure for grid computing

:: content ::

<div class="pki-intro">IHEP operates a complete <strong>Public Key Infrastructure (PKI)</strong>: the trust system used to issue, manage and validate digital certificates for HEP computing.</div>

<div class="pki-system">
  <div class="pki-system-label">PKI system deployed at IHEP</div>
  <div class="pki-service-flow" aria-label="Identity checks, CA certificate issuance, and lifecycle services within the PKI">
    <div class="pki-flow-step">
      <strong>Identity checks</strong>
      <span class="pki-step-detail">Verify the identities of users and service owners.</span>
    </div>
    <div class="pki-flow-connector" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></div>
    <div class="pki-flow-step pki-ca-step">
      <strong>IHEP CA</strong>
      <span class="pki-issuer-full-name">Certification Authority</span>
      <span class="pki-step-detail">Signs X.509 certificates binding verified identities to public keys.</span>
    </div>
    <div class="pki-flow-connector" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></div>
    <div class="pki-flow-step">
      <strong>Lifecycle services</strong>
      <span class="pki-step-detail">Renew certificates; publish revocation and status information.</span>
    </div>
  </div>
</div>

<div class="pki-service-value" aria-label="Value for physics computing">
  <div><strong>Researchers &amp; grid jobs</strong><span>User and robot certificates identify researchers and automated tasks.</span></div>
  <div><strong>Services &amp; data</strong><span>Host certificates support authenticated connections to grid services.</span></div>
  <div><strong>Cross-site trust</strong><span>IGTF trust distribution supports authentication across participating sites.</span></div>
</div>

<div class="pki-trust-takeaway"><strong>Lost trust in the CA ⇒ the whole authentication chain fails.</strong></div>

<!--
Timing: 1:00

Our infrastructure provides the trusted digital identities needed by distributed physics computing. IHEP runs the complete PKI system: policies, identity checks, certificate issuance, lifecycle management and trust information. Within this system, the CA signs certificates that bind a verified identity to a public key. Researchers and automated tasks use user and robot certificates; host certificates identify service endpoints. IGTF distributes the trust anchors so participating sites can authenticate these identities. This supports job submission and data access across sites. Authentication establishes identity; experiment and site policies still decide access rights. The next slide shows which experiments use this service.
-->

---
layout: top-title
color: gray-light
---

:: title ::

# Who relies on the IHEP CA

:: content ::

<div class="who-grid mt-4">
  <div><strong><mdi-atom /> LHC experiments</strong><span> Chinese ATLAS, CMS, ALICE and LHCb groups: user certificates, robot certificates, host certificates for sites and services in the WLCG framework.</span></div>
  <div><strong><mdi-flask /> Non-LHC experiments</strong><span> JUNO, HERD, Belle II and others: grid computing identity for production, analysis and data transfer; formerly also BESIII.</span></div>
  <div><strong><mdi-earth /> International trust</strong><span> As part of the IGTF / APGridPMA trust framework, IHEP-issued identities are recognized by WLCG sites worldwide.</span></div>
</div>

<div class="mt-5">
<AdmonitionType type='important'>
The IHEP CA is <b>shared national infrastructure</b>: one trust anchor behind the distributed computing of essentially every HEP collaboration in China — including future experiments such as CEPC.
</AdmonitionType>
</div>

<div class="experiment-logos" aria-label="Experiments supported by the shared computing infrastructure">
  <figure><img src="/experiments/atlas.png" alt="ATLAS" /><figcaption>ATLAS</figcaption></figure>
  <figure><img src="/experiments/cms.png" alt="CMS" /><figcaption>CMS</figcaption></figure>
  <figure><img src="/experiments/alice.png" alt="ALICE" /><figcaption>ALICE</figcaption></figure>
  <figure><img src="/experiments/lhcb.png" alt="LHCb" /><figcaption>LHCb</figcaption></figure>
  <figure><img src="/experiments/juno.png" alt="JUNO" /><figcaption>JUNO</figcaption></figure>
  <figure><img src="/experiments/herd.png" alt="HERD" /><figcaption>HERD</figcaption></figure>
  <figure><img src="/experiments/belle2.png" alt="Belle II" /><figcaption>Belle II</figcaption></figure>
  <figure><img src="/experiments/besiii.png" alt="BESIII" /><figcaption>BESIII · former</figcaption></figure>
  <figure><img src="/experiments/cepc.png" alt="CEPC" /><figcaption>CEPC · future</figcaption></figure>
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

<div class="ca-history" aria-label="IHEP CA history, from the official website">
  <div><strong>2004</strong><span>Operations began; initially accredited by EUGridPMA, later transitioning to APGridPMA.</span></div>
  <div><strong>2013</strong><span>IHEP-2013 root entered service: SHA-1 with a 1024-bit RSA key.</span></div>
  <div><strong>2026</strong><span>New online PKI and certificate hierarchy: IHEP-2026-ROOT and IHEP-2026-ICA.</span></div>
</div>

<figure class="legacy-ca-figure">
  <img src="/cagrid_screenshot.png" alt="Legacy OpenCA web interface at cagrid.ihep.ac.cn" />
  <figcaption><mdi-web /> cagrid.ihep.ac.cn · legacy interface<br/>History: <a href="https://gridca.ihep.ac.cn/webui/ihepca/">official IHEP CA website</a></figcaption>
</figure>

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

<!--
Timing: 0:55

The public IHEP CA homepage records the history: operations started in 2004 with EUGridPMA accreditation and later transitioned to APGridPMA. The IHEP-2013 root entered service in 2013 using SHA-1 and a 1024-bit RSA key. In 2026 the CA introduced a new root and issuing CA hierarchy alongside the online PKI system. The screenshot shows the legacy interface; the table explains why the old deployment needed replacing.
-->

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

# System development

:: content ::

<div class="ca-development-intro">We built our PKI on open-source <strong>OpenXPKI</strong>, adding IHEP-specific workflows, integrations and operations.</div>

<div class="ca-development-table">

| Repository | Commits | Files | Added lines | IHEP development |
|---|---:|---:|---:|---|
| **openxpki-config** | 85 | 149 | **+7,089** | Workflows, authentication, profiles, WebUI |
| **openxpki-docker** | 41 | 20 | **+2,734** | Deployment, scripts and documentation |
| **monitoring** | 16 | 13 | **+643** | PKI health checks, logs and retention |
| **openxpki-rpm** | 1 | 25 | **+1,149** | RPM specs, container builds and patches |

</div>

<div class="ca-development-method">Prelaunch snapshot; excludes generated WebUI assets and CPAN dependency lockfiles (~18k lines).</div>

<div class="check-grid ca-development-grid">
  <div><mdi-code-braces /><div><strong>Source-level patches</strong><span>8 Perl modules · +1,470 lines in authentication, issuance and migration.</span></div></div>
  <div><mdi-file-cog-outline /><div><strong>YAML workflows &amp; profiles</strong><span>68 files · +4,284 lines for workflows, notifications and EST.</span></div></div>
  <div><mdi-docker /><div><strong>Deployment &amp; operations</strong><span>Compose customization + 10 scripts for CRLs, renewal and reminders.</span></div></div>
  <div><mdi-monitor-dashboard /><div><strong>Monitoring &amp; packaging</strong><span>Dedicated repositories for PKI monitoring and RPM builds.</span></div></div>
</div>

<!--
Timing: 0:45

OpenXPKI is our maintained open-source foundation. On top of it, we developed and integrated the IHEP PKI: local identity integration, approval workflows, legacy migration, lifecycle automation and operational tooling. The table shows the scope of that development, with the changes kept under version control. The next slide presents the capabilities delivered by our system, rather than a list of upstream OpenXPKI features.

Reference: the figures are the snapshot recorded in the prelaunch report, not a new repository recount. The openxpki-config baseline is 0b140fd and the openxpki-docker baseline is c0b9286; monitoring and openxpki-rpm are counted from repository creation. Generated WebUI assets and CPAN dependency lockfiles, approximately 18,000 lines, are excluded. The Perl and YAML figures are subsets of the repository figures, not additional lines to add to them.
-->

---
layout: top-title
color: gray-light
---

:: title ::

# System features

:: content ::

Our deployed PKI provides online certificate services for users, hosts and RA operators.

<div class="check-grid mt-2">
  <div><mdi-account-key /><div><strong>Online request, automatic issuance</strong><span> IHEP-account login, online request for user / robot / host certificates; server-side RSA 4096 keys, automatic issuance after RA approval.</span></div></div>
  <div><mdi-robot-industrial /><div><strong>Smooth legacy migration</strong><span> IHEP-2013 personal certificates migrate in one step, identity locked server-side; legacy hosts migrate via EST — no manual work.</span></div></div>
  <div><mdi-autorenew /><div><strong>EST auto-renewal for hosts</strong><span> Host-side scripts renew within 45 days of expiry and hot-reload services — a zero-ops lifecycle.</span></div></div>
  <div><mdi-file-remove-outline /><div><strong>Online revocation, automatic CRL</strong><span> Single or batch revocation online; CRLs issued on schedule and published to public URLs, per the CP/CPS.</span></div></div>
  <div><mdi-bell-ring-outline /><div><strong>Lifecycle e-mail notifications</strong><span> Pending, issued, rejected and expiring-soon events notify applicants and the RA automatically.</span></div></div>
  <div><mdi-shield-account /><div><strong>RA online workbench</strong><span> Approval queue, certificate search, workflow tracking, batch approval — all logged and auditable.</span></div></div>
</div>

<!--
Timing: 0:55

These are the capabilities of the deployed IHEP system. Researchers request certificates through their IHEP account, and the RA reviews and approves them online. We added migration paths for existing users and hosts, automated host renewal and service reloads, online revocation, scheduled CRL publication and lifecycle notifications. Together these form an integrated service for users and operators, built on the development work shown on the preceding slide.
-->

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
    WebUI --> Server[Server]
    API --> Server
    Server --> DB[(MariaDB)]
    Server --> LDAP[LDAP Auth]
    Server --> Mail[Email Notification]
    Server --> Publish[Certificates / CRLs]
    Publish --> RP[Grid sites / services]
```

</div>

<div class="text-center mt-2">
One PKI backend handles approval workflows, certificate issuance and lifecycle management.
</div>

<!--
Timing: 0:35

This is a functional view of the deployed system. WebUI and automation requests reach one PKI backend, shown simply as Server. Internal OpenXPKI client and server processes are deliberately combined here. The backend coordinates identity integration, certificate workflows, stored records, notifications and public certificate and CRL distribution. Grid sites use the published trust information when authenticating users and services.
-->

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
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# CA monitoring in operation

:: left ::

Three complementary Grafana dashboard views:

- **Status** — container health, certificate issuance and workflow states
- **Audit** — WebUI, RA and EST access and operation records
- **Security** — abnormal logins, policy violations and CRL status

Additional views are under active development.

This recording shows the deployed dashboards, rather than a live connection to the CA system.

:: right ::

<figure class="ca-demo-recording">
  <SlidevVideo :src="'./d4.monitoring.mp4?v=20261030'" :poster="'./d4.monitoring-poster.webp'" width="1264" height="1536" aria-label="Recording of CA monitoring dashboards" autoplay loop muted playsinline controls preload="metadata" />
  <figcaption><mdi-monitor-screenshot /> Recorded CA monitoring · <a :href="'./d4.monitoring.mp4?v=20261030'" target="_blank" rel="noopener noreferrer">Open video</a></figcaption>
</figure>

<!--
Timing: 0:40

The monitoring is operational, not just a design. The three views cover status, audit and security. Let the recording run briefly and point out the relationship between service health and recorded activity. This is a prerecorded view; it does not expose live access to the CA from the presentation.
-->

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# A published guide for the full user journey

:: left ::

The CA guide is published in the **IHEP Computing Platform User Manual** and maintained alongside the system.

- **Apply** — user, robot and host certificates
- **Migrate and renew** — IHEP-2013 personal migration and host certificate automation
- **Download and use** — PKCS#12 export, browser installation and command-line conversion

Users have a maintained reference beyond workshop training and individual support.

:: right ::

<figure class="ca-demo-recording">
  <SlidevVideo :src="'./d5.manual.mp4?v=20261030'" :poster="'./d5.manual-poster.webp'" width="1264" height="1536" aria-label="Recording of the online CA user guide" autoplay loop muted playsinline controls preload="metadata" />
  <figcaption><mdi-book-open-variant /> Recorded user guide · <a :href="'./d5.manual.mp4?v=20261030'" target="_blank" rel="noopener noreferrer">Open video</a></figcaption>
</figure>

<!--
Timing: 0:40

The user documentation is already published in the computing platform manual. The recording illustrates how users can follow the complete journey, from choosing a certificate type to migration, download and installation. Keep this overview short: the conference presentation is not a step-by-step training session.
-->

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

# Timeline: development, accreditation, migration

:: content ::

<div class="ca-rollout-timeline" aria-label="Chronological phases, read each column from top to bottom, then move right">
  <section class="ca-timeline-phase ca-timeline-build">
    <div class="ca-timeline-heading"><span>2025</span><strong>Build &amp; deploy</strong></div>
    <ol class="ca-timeline-events">
      <li><strong class="ca-timeline-date">Early 2025</strong><span>OpenXPKI-based architecture selected.</span></li>
      <li><strong class="ca-timeline-date">Mid-2025</strong><span>Development and testing.</span></li>
      <li><strong class="ca-timeline-date">Late 2025</strong><span>CA system deployed.</span></li>
    </ol>
  </section>
  <div class="ca-timeline-connector" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></div>
  <section class="ca-timeline-phase ca-timeline-review">
    <div class="ca-timeline-heading"><span>February–July 2026</span><strong>Apply &amp; review</strong></div>
    <ol class="ca-timeline-events">
      <li><strong class="ca-timeline-date">February 2026</strong><span>First contact with the APGridPMA chair.</span></li>
      <li><strong class="ca-timeline-date">March 2026</strong><span>Formal application submitted at ISGC.</span></li>
      <li><strong class="ca-timeline-date">April–July 2026</strong><span>Review and sustained follow-up.</span></li>
    </ol>
  </section>
  <div class="ca-timeline-connector" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></div>
  <section class="ca-timeline-phase ca-timeline-migrate">
    <div class="ca-timeline-heading"><span>August–December 2026</span><strong>Accredit &amp; migrate</strong></div>
    <ol class="ca-timeline-events">
      <li><strong class="ca-timeline-date">August 2026</strong><span>IHEP-2026 hierarchy included in IGTF 1.145.</span></li>
      <li><strong class="ca-timeline-date">End of 2026</strong><span>IHEP-2013 root expires: migration deadline.</span></li>
    </ol>
  </section>
</div>

<div class="mt-4">
<AdmonitionType type='warning'>
<b>The end-2026 expiry of the IHEP-2013 root is the hard deadline for this transition.</b> The new CA is accredited and in production; a unified migration notice gives every user a sufficient window to switch.
</AdmonitionType>
</div>

<!--
Timing: 0:55

Read each phase from top to bottom, then move to the next column. In early 2025 we selected the OpenXPKI-based architecture. Development and testing followed in the middle of the year, and the system was deployed at the end of 2025. The middle phase covers the initial APGridPMA contact, the formal ISGC application and subsequent review. The IHEP-2026 hierarchy was included in IGTF 1.145 in August 2026. The final milestone is the end-2026 expiry of the IHEP-2013 root, which sets the migration deadline.
-->

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
- **Shared foundation** — LHC, JUNO, HERD and Belle II; formerly BESIII; future support for CEPC

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
